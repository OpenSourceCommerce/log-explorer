<?php

namespace App\Repository;

use App\Entity\Column;
use App\Entity\Table;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Column|null find($id, $lockMode = null, $lockVersion = null)
 * @method Column|null findOneBy(array $criteria, array $orderBy = null)
 * @method Column[]    findAll()
 * @method Column[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ColumnRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Column::class);
    }

    public function removeNotIn(Table $table, array $columnNames)
    {
        return $this->createQueryBuilder('c')
            ->where('c.table = :table')
            ->setParameter('table', $table)
            ->andWhere((new Expr())->notIn('c.name', $columnNames))
            ->delete()
            ->getQuery()
            ->execute();
    }
}
