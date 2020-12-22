<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * @param array $ids
     * @return array
     */
    public function findAllIn(array $ids)
    {
        return $sql = $this->createQueryBuilder('u')
            ->andWhere((new Expr())->in('u.id', ':ids'))
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    public function getAllUser(array $options)
    {
        $limit = $options['limit'] ?? 10;
        $page = $options['page'] ?? 1;
        $keyword = $options['kw'] ?? false;
        $builder = $this->createQueryBuilder('u');
        if ($keyword) {
            $builder->andWhere($builder->expr()->orX(
                $builder->expr()->like('u.email', ':kw'),
                $builder->expr()->like('CONCAT(u.firstName, u.lastName)', ':kw')
            ))->setParameter('kw', "%{$keyword}%");
        }
        if ($limit) {
            $builder->setMaxResults($limit);
        }
        if ($limit && $page) {
            $builder->setFirstResult(($page - 1) * $limit);
        }
        return $builder->getQuery()->getResult();
    }
}
