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
        $rawColumns = $this->connection->getRawColumns($logView->getTable());
        $columns = $logViewColumns = $logView->getLogViewColumns();
        $isArrayString = false;

        $rawColumnNames = array_column($rawColumns, 'name');
        $logViewColumnNames = array_column($logViewColumns, 'name');

        $diff = array_merge(array_diff($logViewColumnNames, $rawColumnNames), array_diff($rawColumnNames, $logViewColumnNames));

        if (empty($columns) || !is_array($columns[0]) || !empty($diff)) {
            $isArrayString = empty($diff);
            $columns = $rawColumns;
        }

        $response = [];

        foreach ($columns as $index => $column) {
            $visible = true;

            if ($isArrayString) {
                if (!in_array($column['name'], $logViewColumns) && !empty($logViewColumns)) {
                    $visible = false;
                }
            } else {
                $logViewColumn = array_filter($logViewColumns, function ($item) use ($column) {
                    return $item['name'] == $column['name'];
                });

                if (!empty($logViewColumn)) {
                    $logViewColumn = array_shift($logViewColumn);
                    $visible = $logViewColumn['visible'];
                    $index = $logViewColumn['index'];
                } else {
                    $visible = $column['visible'] ?? (!in_array($column['name'], $diff) || empty($logViewColumns));
                    $index = $column['index'] ?? $index;
                }
            }

            $response[] = [
                'name' => $column['name'],
                'title' => ColumnHelper::titleFromName($column['name']),
                'type' => 'String',
                'visible' => $visible ? 1 : 0,
                'index' => $index,
            ];
        }

        usort($response, function ($a, $b) {
            return ($a['index'] < $b['index']) ? -1 : 1;
        });

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
        $columns = $logView->getLogViewColumns();
        $isArrayString = false;

        if (empty($columns) || !is_array($columns[0])) {
            $isArrayString = true;
            $columns = $this->connection->getRawColumns($logView->getTable());
        }

        $response = [];

        foreach ($columns as $column) {
            if ($isArrayString && !in_array($column['name'], $logView->getLogViewColumns())) {
                $visible = false;
            } else {
                $visible = $column['visible'];
            }

            $response[] = [
                'name' => $column['name'],
                'title' => ColumnHelper::titleFromName($column['name']),
                'type' => 'String',
                'visible' => $visible ? 1 : 0,
            ];
        }

        return $response;
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
    public function setVisibleColumn(LogView $logView, string $columnName, bool $visible, int $index)
    {
        $columns = $this->getColumnSetting($logView);

        $columns = array_map(function ($column) use ($columnName, $visible, $index) {
            if ($column['name'] == $columnName) {
                $column['visible'] = $visible ? 1 : 0;
                $column['index'] = $index;
            }

            return $column;
        }, $columns);

        $logView->setLogViewColumn($columns);
        $this->save($logView);
    }

    /**
     * @inheritDoc
     */
    public function setVisibleColumns(LogView $logView, bool $visible)
    {
        $columns = ['_id'];

        if ($visible) {
            $columns = $this->connection->getRawColumns($logView->getTable());
            $columns = array_column($columns, 'name');
            $columns = array_values($columns);
        }

        $logView->setLogViewColumn($columns);
        $this->save($logView);
    }
}
