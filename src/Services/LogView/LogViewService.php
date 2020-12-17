<?php


namespace App\Services\LogView;


use App\Entity\Column;
use App\Entity\LogView;
use App\Entity\LogViewColumn;
use App\Entity\Graph;
use App\Entity\Table;
use App\Repository\LogViewRepository;
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

    private function getRepository(): LogViewRepository
    {
        return $this->em->getRepository(LogView::class);
    }

    /**
     * @inheritDoc
     */
    public function getDefault(): ?LogView
    {
        return $this->getRepository()->findOneBy([]);
    }

    /**
     * @inheritDoc
     */
    public function createLogView(Table $table, Graph $graph, ?string $name, bool $flush = true): LogView
    {
        if (empty($name)) {
            $name = $table->getName();
        }

        $logView = new LogView();
        $logView->setTable($table);
        $logView->setName($name);
        $logView->setGraph($graph);

        $table->setLogView($logView);

        return $this->save($logView, $flush);
    }

    /**
     * @param LogView $logView
     * @param bool $flush
     * @return LogView
     */
    private function save(LogView $logView, bool $flush = true): LogView
    {
        $this->em->persist($logView);
        if ($flush) {
            $this->em->flush();
        }

        return $logView;
    }

    /**
     * @inheritDoc
     */
    public function setSummary(LogView $logView, array $columns)
    {
        $logView->clearSummary();
        foreach ($columns as $column) {
            $logView->addSummary($column);
        }
        $this->save($logView);
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
    public function setupColumnSetting(LogView $logView, bool $flush = true)
    {
        $columns = $logView->getTable()->getColumns();

        /** @var Column $column */
        foreach ($columns as $column) {
            $this->addColumnSetting($logView, $column, false);
        }

        if ($flush) {
            $this->em->flush();
        }

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

    /**
     * @inheritDoc
     */
    public function addColumnSetting(LogView $logView, Column $column, $flush = true): LogViewColumn
    {
        $logViewColumn = new LogViewColumn();
        $logViewColumn->setColumn($column);
        $logViewColumn->setLabel($column->getTitle());
        $logViewColumn->setLogView($logView);
        $logViewColumn->setVisible(true);

        $this->em->persist($logViewColumn);
        if ($flush) {
            $this->em->flush();
        }
        return $logViewColumn;
    }
}
