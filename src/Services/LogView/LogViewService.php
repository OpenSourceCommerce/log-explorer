<?php


namespace App\Services\LogView;


use App\Entity\Column;
use App\Entity\LogView;
use App\Entity\DemoLogView;
use App\Entity\LogViewColumn;
use App\Entity\Table;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;

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
    public function getDefault(): DemoLogView
    {
        return new DemoLogView();
    }

    /**
     * @inheritDoc
     */
    public function createLogView(Table $table, ?string $name): LogView
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

    private function getRepository(): ObjectRepository
    {
        return $this->em->getRepository(LogView::class);
    }

    public function list(): array
    {
        return $this->getRepository()->findAll();
    }

    /**
     * @inheritDoc
     */
    public function getColumnSetting(LogView $logView)
    {
        $columns = $logView->getLogViewColumns();

        if ($columns->isEmpty()) {
            $this->setupColumnSetting($logView);
        }

        return $logView->getLogViewColumns();
    }

    /**
     * @inheritDoc
     */
    public function setupColumnSetting(LogView $logView)
    {
        $columns = $logView->getTable()->getColumns();

        /** @var Column $column */
        foreach ($columns as $column) {
            $logviewColumn = new LogViewColumn();
            $logviewColumn->setColumn($column);
            $logviewColumn->setLabel($column->getName());
            $logviewColumn->setLogView($logView);
            $logviewColumn->setVisible(true);

            $this->em->persist($logviewColumn);
        }

        $this->em->flush();

        return $logView->getLogViewColumns();
    }

    /**
     * @inheritDoc
     */
    public function findByUuid(string $uuid): ?LogView
    {
        return $this->getRepository()->findOneBy(['uuid' => $uuid]);
    }

    /**
     * @inheritDoc
     */
    public function getVisibleColumns(LogView $logView)
    {
        $columns = $logView->getLogViewColumns();
        $response = [];

        foreach ($columns as $column) {
            if ($column->getVisible()) {
                $response[] = $column->getColumn();
            }
        }

        return $response;
    }
}
