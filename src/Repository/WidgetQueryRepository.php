<?php

namespace App\Repository;

use App\Entity\WidgetQuery;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method WidgetQuery|null find($id, $lockMode = null, $lockVersion = null)
 * @method WidgetQuery|null findOneBy(array $criteria, array $orderBy = null)
 * @method WidgetQuery[]    findAll()
 * @method WidgetQuery[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WidgetQueryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WidgetQuery::class);
    }

    // /**
    //  * @return WidgetQuery[] Returns an array of WidgetQuery objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WidgetQuery
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
