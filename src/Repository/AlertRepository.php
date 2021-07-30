<?php

namespace App\Repository;

use App\Entity\Alert;
use App\Entity\AlertLog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Alert|null find($id, $lockMode = null, $lockVersion = null)
 * @method Alert|null findOneBy(array $criteria, array $orderBy = null)
 * @method Alert[]    findAll()
 * @method Alert[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlertRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Alert::class);
    }

    /**
     * @return Alert[] Returns an array of Alert objects
     */
    public function findAvailableAlerts($limit = 20): array
    {
        $builder = $this->createQueryBuilder('a');
        $now = date('Y-m-d H:i:s');

        $query = $builder
            ->andWhere('a.isActive = 1')
            ->andWhere($builder->expr()->orX(
                $builder->expr()->isNull('a.nextRunAt'),
                $builder->expr()->lte('a.nextRunAt', ':now')
            ))
            ->setParameter('now', $now)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults($limit);

        return $query->getQuery()
            ->getResult();
    }

}
