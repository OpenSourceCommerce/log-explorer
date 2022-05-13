<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
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

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function findActiveUserByRole($role)
    {
        return $this->createQueryBuilder('u')
            ->andWhere("u.roles LIKE :roles")
            ->andWhere("u.isActive = 1")
            ->andWhere("u.isConfirmed = 1")
            ->setParameter('roles', '%"' . $role . '"%')
            ->getQuery()
            ->setMaxResults(1)
            ->getSingleResult();
    }
}
