<?php

namespace App\Repository;

use App\Entity\GraphLine;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method GraphLine|null find($id, $lockMode = null, $lockVersion = null)
 * @method GraphLine|null findOneBy(array $criteria, array $orderBy = null)
 * @method GraphLine[]    findAll()
 * @method GraphLine[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GraphLineRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GraphLine::class);
    }
}
