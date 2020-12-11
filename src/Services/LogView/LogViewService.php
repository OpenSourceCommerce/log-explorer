<?php


namespace App\Services\LogView;


use App\Entity\LogView;
use App\Entity\DemoDashboard;
use App\Entity\Table;
use Doctrine\ORM\EntityManagerInterface;

class LogViewService implements LogViewServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * LogViewService constructor.
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @inheritDoc
     */
    public function getDefault(): DemoDashboard
    {
        return new DemoDashboard();
    }

    /**
     * @inheritDoc
     */
    public function createDashboard(Table $table, ?string $name): LogView
    {
        if (empty($name)) {
            $name = $table->getName();
        }

        $dashboard = new LogView();
        $dashboard->setTable($table);
        $dashboard->setName($name);

        return $this->save($dashboard);
    }

    /**
     * @param LogView $dashboard
     * @return LogView
     */
    private function save(LogView $dashboard): LogView
    {
        $this->em->persist($dashboard);
        $this->em->flush();

        return $dashboard;
    }
}
