<?php


namespace App\Services\Database;


use App\Entity\Table;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\InvalidSqlQueryException;
use App\Exceptions\TableExistException;
use App\Services\Clickhouse\ClickhouseServiceInterface;
use App\Services\Clickhouse\ConnectionInterface;
use App\Services\Column\ColumnServiceInterface;
use App\Services\LogView\LogViewServiceInterface;
use App\Services\Table\TableServiceInterface;
use Doctrine\ORM\EntityManagerInterface;

class DatabaseService implements DatabaseServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var ConnectionInterface */
    private $connection;
    /** @var TableServiceInterface */
    private $tableService;
    /** @var ColumnServiceInterface */
    private $columnService;
    /** @var ClickhouseServiceInterface */
    private $clickhouseService;
    /**
     * @var LogViewServiceInterface
     */
    private $dashboardService;

    /**
     * DatabaseService constructor.
     * @param EntityManagerInterface $em
     * @param ConnectionInterface $connection
     * @param TableServiceInterface $tableService
     * @param ColumnServiceInterface $columnService
     * @param ClickhouseServiceInterface $clickhouseService
     * @param LogViewServiceInterface $dashboardService
     */
    public function __construct(
        EntityManagerInterface $em,
        ConnectionInterface $connection,
        TableServiceInterface $tableService,
        ColumnServiceInterface $columnService,
        ClickhouseServiceInterface $clickhouseService,
        LogViewServiceInterface $dashboardService
    ) {
        $this->em = $em;
        $this->connection = $connection;
        $this->tableService = $tableService;
        $this->columnService = $columnService;
        $this->clickhouseService = $clickhouseService;
        $this->dashboardService = $dashboardService;
    }

    /**
     * @inheritDoc
     */
    public function processQuery(string $query)
    {
        $tableName = $this->getTableFromQuery($query);
        if (empty($tableName)) {
            throw new InvalidSqlQueryException();
        }
        if (!$this->connection->exec($query)) {
            return false;
        }

        return $this->syncTable($tableName);
    }

    private function getTableFromQuery(string $query): ?string
    {
        $matches = [];
        if (preg_match('#^CREATE TABLE( IF NOT EXISTS)? ([\w\.]+)( ON CLUSTER [\w\.]+)?(\s)?\(#i', $query, $matches)) {
            return $matches[2];
        } elseif (preg_match('#^ALTER TABLE (\w+) #i', $query, $matches)) {
            return $matches[1];
        }
        return null;
    }

    private function syncTable(string $tableName): Table
    {
        $clickhouseColumns = $this->connection->getRawColumns($tableName);

        $table = $this->tableService->getTableByName($tableName);
        $isExist = true;
        if (is_null($table)) {
            $table = $this->tableService->createTable($tableName, false);
            $this->dashboardService->createLogView($table, null);
            $isExist = false;
        }

        $columnNames = [];
        foreach ($clickhouseColumns as $clickhouseColumn) {
            $column = null;
            $name = $clickhouseColumn['name'];
            $type = $clickhouseColumn['type'];
            $title = ucfirst($name);
            $title = str_replace('_', ' ', $title);
            $columnNames[] = $name;
            if ($isExist) {
                $column = $this->columnService->findByName($table, $name);
                if (!empty($column) && ($column->getType() !== $type || $column->getTitle() !== $title)) {
                    $this->columnService->updateColumn($column, ['title' => $title, 'type' => $type], false);
                }
            }
            if (empty($column)) {
                $this->columnService->create(
                    $table, [
                    'name' => $name,
                    'title' => $title,
                    'type' => $type
                ],
                    false
                );
            }
        }
        if ($isExist) {
            $this->columnService->removeNotIn($table, $columnNames);
        }
        $this->em->flush();

        return $table;
    }

    public function syncAllTableToSystem()
    {
        $tables = $this->connection->getTables();
        foreach ($tables as $table) {
            $this->syncTable($table);
        }
    }

    /**
     * @inheritDoc
     */
    public function createTable(string $name, array $columns): Table
    {
        if ($this->connection->tableExists($name)) {
            throw new TableExistException();
        }
        if ($this->tableService->isTableExist($name)) {
            throw new TableExistException();
        }
        $hasTimestamp = false;
        foreach ($columns as $k => $column) {
            if ($column['name'] === 'timestamp' && $column['type'] !== 'DateTime') {
                $columns[$k]['type'] = 'DateTime';
                $hasTimestamp = true;
                break;
            }
        }
        if (!$hasTimestamp) {
            $columns[] = [
                'name' => 'timestamp',
                'type' => 'DateTime',
                'title' => 'Created at',
            ];
        }
        $query = $this->makeCreateTableQuery($name, $columns);

        if (!$this->connection->exec($query)) {
            return false;
        }

        $columns = $this->makeColumnTitle($columns);

        $table = $this->tableService->createTable($name, false);
        foreach ($columns as $column) {
            $this->columnService->create($table, $column, false);
        }
        $this->em->flush();

        $this->dashboardService->createLogView($table, null);

        return $table;
    }

    private function makeCreateTableQuery(string $name, array $columns): string
    {
        $query = 'CREATE TABLE ' . $name . ' (';
        foreach ($columns as $k => $column) {
            if (!empty($k)) {
                $query .= ',';
            }
            $query .= "`{$column['name']}` {$column['type']}";
        }
        $query .= ') ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp))
ORDER BY timestamp
SETTINGS index_granularity = 8192';
        return $query;
    }

    private function makeAlertTableQuery(string $tableName, array $column): string
    {
        return "ALTER TABLE {$tableName} ADD COLUMN `{$column['name']}` {$column['type']}";
    }

    private function makeColumnTitle(array $columns): array
    {
        foreach ($columns as $k => $column) {
            if (empty($column['title'])) {
                $title = $column['name'];
                $title = ucfirst($title);
                $title = trim(str_replace('_', ' ', $title));
                $columns[$k]['title'] = $title;
            }
        }
        return $columns;
    }

    /**
     * @inheritDoc
     */
    public function updateTable(Table $table, string $name, array $columns): Table
    {
        if ($table->getName() !== $name) {
            // not allow to change table name
            throw new ActionDeniedException();
        }
        foreach ($columns as $column) {
            if (!empty($column['id'])) {
                $obj = $this->columnService->findById($column['id']);
                if (empty($obj) || $obj->getTable()->getId() != $table->getId() || $obj->getName() !== $column['name'] || $obj->getType() !== $column['type']) {
                    // not allow to change column name or type
                    throw new ActionDeniedException();
                }
                if ($column['title'] !== $obj->getTitle()) {
                    $this->columnService->updateColumn($obj, $column);
                }
            } else {
                $query = $this->makeAlertTableQuery($name, $column);
                $this->connection->exec($query);
                $this->columnService->create($table, $column);
            }
        }
        return $table;
    }
}
