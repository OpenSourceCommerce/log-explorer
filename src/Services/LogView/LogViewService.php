<?php


namespace App\Services\LogView;


use App\Entity\LogView;
use App\Entity\Graph;
use App\Helper\ColumnHelper;
use App\Repository\LogViewRepository;
use App\Services\Clickhouse\Connection;
use Doctrine\ORM\EntityManagerInterface;

class LogViewService implements LogViewServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $em;
    /** @var Connection */
    private $connection;

    /**
     * LogViewService constructor.
     * @param EntityManagerInterface $em
     * @param Connection $connection
     */
    public function __construct(EntityManagerInterface $em, Connection $connection)
    {
        $this->em = $em;
        $this->connection = $connection;
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
    public function createLogView(string $table, Graph $graph, ?string $name, bool $flush = true): LogView
    {
        if (empty($name)) {
            $name = $table;
        }

        $logView = new LogView();
        $logView->setTable($table);
        $logView->setName($name);
        $logView->setGraph($graph);
        $logView->setSummary([]);
        $logView->setLogViewColumn([]);

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
        $logView->setSummary($columns);

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
        $columns = $this->connection->getRawColumns($logView->getTable());
        $visible = $logView->getLogViewColumns();
        $visible = array_flip($visible);
        $response = [];

        foreach ($columns as $column) {
            $response[] = [
                'name' => $column['name'],
                'title' => ColumnHelper::titleFromName($column['name']),
                'type' => 'String',
                'visible' => (empty($visible) || isset($visible[$column['name']])),
            ];
        }

        return $response;
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
    public function getVisibleColumns(LogView $logView): array
    {
        $visible = $logView->getLogViewColumns();
        if (empty($visible)) {
            return $visible;
        } else {
            return $this->connection->getRawColumns($logView->getTable());
        }
    }

    /**
     * @inheritDoc
     */
    public function findByTable(string $name): ?LogView
    {
        return $this->getRepository()->findOneBy(['table' => $name]);
    }

    /**
     * @inheritDoc
     */
    public function setVisibleColumn(LogView $logView, array $columns)
    {
        $logView->setLogViewColumn($columns);
        $this->save($logView);
    }
}
