<?php

namespace App\Repository;

use App\Entity\Column;
use App\Entity\LogView;
use App\Entity\LogViewColumn;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LogView|null find($id, $lockMode = null, $lockVersion = null)
 * @method LogView|null findOneBy(array $criteria, array $orderBy = null)
 * @method LogView[]    findAll()
 * @method LogView[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LogViewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LogView::class);
    }

    /*public function getColumns(LogView $logView): array
    {
        return $this->createQueryBuilder('l')
            ->innerJoin(LogViewColumn::class, 'lc')
            ->innerJoin(Column::class)
            ->getQuery()
            ->getResult()
            ;
    }*/
}
