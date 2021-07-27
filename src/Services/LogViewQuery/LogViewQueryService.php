<?php


namespace App\Services\LogViewQuery;


use App\Entity\LogView;
use App\Entity\LogViewQuery;
use Doctrine\ORM\EntityManagerInterface;

class LogViewQueryService implements LogViewQueryServiceInterface
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
    public function create(LogView $logView, LogViewQuery $query): LogViewQuery
    {
        $query->setLogView($logView);

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
}
