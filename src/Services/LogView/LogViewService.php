<?php


namespace App\Services\LogView;


use App\Entity\Graph;
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
    public function createLogView(Table $table, Graph $graph, ?string $name, bool $flush = true): LogView
    {
        if (empty($name)) {
            $name = $table->getName();
        }

        $dashboard = new LogView();
        $dashboard->setTable($table);
        $dashboard->setName($name);
        $dashboard->setGraph($graph);

        return $this->save($dashboard, $flush);
    }

    /**
     * @param LogView $dashboard
     * @param bool $flush
     * @return LogView
     */
    private function save(LogView $dashboard, bool $flush = true): LogView
    {
        $this->em->persist($dashboard);
        if ($flush) {
            $this->em->flush();
        }

        return $dashboard;
    }
}
