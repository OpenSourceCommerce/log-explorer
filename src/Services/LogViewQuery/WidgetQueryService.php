<?php


namespace App\Services\LogViewQuery;


use App\Entity\LogView;
use App\Entity\LogViewQuery;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class WidgetQueryService implements WidgetQueryServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * LogViewQueryService constructor.
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @inheritDoc
     */
    public function create(LogView $logView, LogViewQuery $query, User $user): LogViewQuery
    {
        $query->setLogView($logView);
        $query->setUser($user);

        $this->em->persist($query);
        $this->em->flush();

        return $query;
    }

    /**
     * @inheritDoc
     */
    public function update(LogViewQuery $query): LogViewQuery
    {
        $this->em->persist($query);
        $this->em->flush();

        return $query;
    }

    /**
     * @inheritDoc
     */
    public function delete(LogViewQuery $query)
    {
        $this->em->remove($query);
        $this->em->flush();
    }
}
