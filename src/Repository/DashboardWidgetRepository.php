<?php

namespace App\Repository;

use App\Entity\DashboardWidget;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DashboardWidget|null find($id, $lockMode = null, $lockVersion = null)
 * @method DashboardWidget|null findOneBy(array $criteria, array $orderBy = null)
 * @method DashboardWidget[]    findAll()
 * @method DashboardWidget[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DashboardWidgetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DashboardWidget::class);
    }

    // /**
    //  * @return DashboardWidget[] Returns an array of DashboardWidget objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DashboardWidget
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
