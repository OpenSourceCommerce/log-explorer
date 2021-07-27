<?php

namespace App\Repository;

use App\Entity\LogViewQuery;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LogViewQuery|null find($id, $lockMode = null, $lockVersion = null)
 * @method LogViewQuery|null findOneBy(array $criteria, array $orderBy = null)
 * @method LogViewQuery[]    findAll()
 * @method LogViewQuery[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LogViewQueryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LogViewQuery::class);
    }

    // /**
    //  * @return LogViewQuery[] Returns an array of LogViewQuery objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LogViewQuery
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
