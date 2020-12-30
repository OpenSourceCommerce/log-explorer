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

    public function findAllNotLogView()
    {
        return $this->createQueryBuilder('c')
            ->leftJoin('c.logView', 'v')
            ->where('v.id IS NULL')
            ->getQuery()
            ->getResult();
    }
}
