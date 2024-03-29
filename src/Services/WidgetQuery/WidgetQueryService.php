<?php


namespace App\Services\WidgetQuery;


use App\Entity\WidgetQuery;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class WidgetQueryService implements WidgetQueryServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * WidgetQueryService constructor.
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @inheritDoc
     */
    public function create(WidgetQuery $query, User $user): WidgetQuery
    {
        $query->setUser($user);

        $this->em->persist($query);
        $this->em->flush();

        return $query;
    }

    /**
     * @inheritDoc
     */
    public function update(WidgetQuery $query): WidgetQuery
    {
        $this->em->persist($query);
        $this->em->flush();

        return $query;
    }

    /**
     * @inheritDoc
     */
    public function delete(WidgetQuery $query)
    {
        $this->em->remove($query);
        $this->em->flush();
    }
}
