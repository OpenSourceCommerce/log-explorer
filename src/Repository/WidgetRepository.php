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
        $ret = $this->createQueryBuilder('w')
            ->select('w.id')
            ->getQuery()
            ->getArrayResult();
        return array_column($ret, 'id');
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
            ->select('w.from_table')
            ->where((new Expr())->in('w.id', $ids))
            ->groupBy('w.from_table')
            ->getQuery()
            ->getArrayResult();
        return count($tables) === 1;
    }
}
