<?php

namespace App\Repository;

use App\Entity\Widget;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\Query\Expr;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Widget|null find($id, $lockMode = null, $lockVersion = null)
 * @method Widget|null findOneBy(array $criteria, array $orderBy = null)
 * @method Widget[]    findAll()
 * @method Widget[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WidgetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Widget::class);
    }

    public function getAllId($options = []): array
    {
        return $this->createQueryBuilder('w')
            ->select('id')
            ->getQuery()
            ->getArrayResult();
    }

    public function getAllByIds($ids = []): array
    {
        return $this->createQueryBuilder('w')
            ->where((new Expr())->in('w.id', $ids))
            ->getQuery()
            ->getResult();
    }

    public function checkWidgetIdSameTable(array $ids): bool
    {
        $tables = $this->createQueryBuilder('w')
            ->select('from_table')
            ->where((new Expr())->in('id', $ids))
            ->groupBy('from_table')
            ->getQuery()
            ->getArrayResult();
        return count($tables) === 1;
    }
}
