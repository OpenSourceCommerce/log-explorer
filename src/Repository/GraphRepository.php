<?php

namespace App\Repository;

use App\Entity\Graph;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Graph|null find($id, $lockMode = null, $lockVersion = null)
 * @method Graph|null findOneBy(array $criteria, array $orderBy = null)
 * @method Graph[]    findAll()
 * @method Graph[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GraphRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Graph::class);
    }

    // /**
    //  * @return Graph[] Returns an array of Graph objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Graph
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
