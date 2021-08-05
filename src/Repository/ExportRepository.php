<?php

namespace App\Repository;

use App\Entity\Export;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Export|null find($id, $lockMode = null, $lockVersion = null)
 * @method Export|null findOneBy(array $criteria, array $orderBy = null)
 * @method Export[]    findAll()
 * @method Export[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExportRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Export::class);
    }

     /**
      * @return Export[] Returns an array of Export objects
      */
    public function findExpiredExports(int $limit = 20): array
    {
        $date = new \DateTime();

        return $this->createQueryBuilder('e')
            ->andWhere('e.expiredAt <= :date')
            ->setParameter('date', $date)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

     /**
      * @return Export[] Returns an array of Export objects
      */
    public function findNotProcessed(int $limit = 1): array
    {
        $date = new \DateTime();

        return $this->createQueryBuilder('e')
            ->andWhere('e.expiredAt <= :date')
            ->setParameter('date', $date)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }
}
