<?php

namespace App\Repository;

use App\Entity\LogView;
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
}
