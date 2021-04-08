<?php


namespace App\Services\Database;

use App\Entity\Dashboard;
use App\Exceptions\ColumnNotExistException;
use App\Exceptions\TableExistException;
use App\Exceptions\TableNotExistException;
use App\Services\Clickhouse\ClickhouseServiceInterface;
use App\Services\Clickhouse\ConnectionInterface;
use App\Services\Graph\GraphServiceInterface;
use App\Services\GraphLine\GraphLineServiceInterface;
use App\Services\LogView\LogViewServiceInterface;
use App\Validator\Password;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

class DatabaseService implements DatabaseServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var ConnectionInterface */
    private $connection;
    /** @var ClickhouseServiceInterface */
    private $clickhouseService;
    /** @var LogViewServiceInterface */
    private $logViewService;
    /** @var GraphServiceInterface */
    private $graphService;
    /** @var GraphLineServiceInterface */
    private $graphLineService;

    /**
     * DatabaseService constructor.
     * @param EntityManagerInterface $em
     * @param ConnectionInterface $connection
     * @param ClickhouseServiceInterface $clickhouseService
     * @param LogViewServiceInterface $logViewService
     * @param GraphServiceInterface $graphService
     * @param GraphLineServiceInterface $graphLineService
     */
    public function __construct(
        EntityManagerInterface $em,
        ConnectionInterface $connection,
        ClickhouseServiceInterface $clickhouseService,
        LogViewServiceInterface $logViewService,
        GraphServiceInterface $graphService,
        GraphLineServiceInterface $graphLineService
    ) {
        $this->em = $em;
        $this->connection = $connection;
        $this->clickhouseService = $clickhouseService;
        $this->logViewService = $logViewService;
        $this->graphService = $graphService;
        $this->graphLineService = $graphLineService;
    }

    /**
     * @inheritDoc
     */
    public function createTable(string $name, array $columns, array $options = []): bool
    {
        if ($this->connection->tableExists($name)) {
            throw new TableExistException();
        }
        $systemColumns = $this->getSystemColumns();
        foreach ($columns as $k => $column) {
            if (isset($systemColumns[$column['name']])) {
                if ($column['type'] != $systemColumns[$column['name']]) {
                    $column['type'] = $systemColumns[$column['name']];
                }
                unset($systemColumns[$column['name']]);
            }
        }
        foreach ($systemColumns as $column => $type) {
            $columns[] = [
                'name' => $column,
                'type' => $type,
            ];
        }
        $query = $this->makeCreateTableQuery($name, $columns, $options);

        if (!$this->connection->exec($query)) {
            return false;
        }

        $this->setupNewTable($name);
        $this->em->flush();

        return true;
    }

    private function setupNewTable(string $table)
    {
        $graph = $this->graphService->createLogViewGraph($table, 12, false);
        $this->graphLineService->createDefaultGraphLine($graph, false);
        return $this->logViewService->createLogView($table, $graph, null, false);
    }

    private function makeCreateTableQuery(string $name, array $columns, array $options = []): string
    {
        $query = 'CREATE TABLE ' . $name . ' (';
        foreach ($columns as $k => $column) {
            if (!empty($k)) {
                $query .= ',';
            }
            $query .= "`{$column['name']}` {$column['type']}";
        }
        $query .= ",INDEX _id _id TYPE bloom_filter GRANULARITY 512";
        $query .= ") ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp))
ORDER BY timestamp\n";
        if (!empty($options['ttl'])) {
            $query .= 'TTL '.$options['ttl']."\n";
        }
        $query .= 'SETTINGS index_granularity = 8192';
        return $query;
    }

    private function makeAlertAddColumnQuery(string $tableName, array $column): string
    {
        return "ALTER TABLE {$tableName} ADD COLUMN `{$column['name']}` {$column['type']}";
    }

    private function makeDropColumnQuery(string $table, string $column): string
    {
        return "ALTER TABLE {$table} DROP COLUMN `{$column}`";
    }

    private function makeAlertColumnTypeQuery(string $table, array $column): string
    {
        return "ALTER TABLE {$table} MODIFY COLUMN {$column['origin']} {$column['type']}";
    }

    private function makeAlertColumnNameQuery(string $table, array $column): string
    {
        return "ALTER TABLE {$table} RENAME COLUMN `{$column['origin']}` TO `{$column['name']}`";
    }

    private function makeAlertTableNameQuery(string $table, string $newTable): string
    {
        return "RENAME TABLE {$table} TO {$newTable}";
    }

    private function updateTableName(string $table, string $newName): bool
    {
        $query = $this->makeAlertTableNameQuery($table, $newName);
        if (!$this->connection->exec($query)) {
            return false;
        }
        return true;
    }

    private function addNewColumns(string $table, array $existingColumns, array $columns): bool
    {
        foreach ($columns as $column) {
            $realName = empty($column['origin']) ? $column['name'] : $column['origin'];
            if (isset($existingColumns[$realName])) {
                continue;
            }
            $query = $this->makeAlertAddColumnQuery($table, $column);
            if (!$this->connection->exec($query)) {
                return false;
            }
        }
        return true;
    }

    private function changeExistingColumn(string $table, array $existingColumns, array $columns): bool
    {
        foreach ($columns as $column) {
            $realName = empty($column['origin']) ? $column['name'] : $column['origin'];
            if (!isset($existingColumns[$realName])) {
                continue;
            }
            if ($existingColumns[$realName] != $column['type']) {
                $query = $this->makeAlertColumnTypeQuery($table, $column);
                if (!$this->connection->exec($query)) {
                    return false;
                }
            }
            if ($realName !== $column['name']) {
                $query = $this->makeAlertColumnNameQuery($table, $column);
                if (!$this->connection->exec($query)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * @inheritDoc
     */
    public function updateTable(string $table, array $data): bool
    {
        $columns = $data['columns'];
        $newTableName = $data['name'];
        if (!$this->connection->tableExists($table)) {
            throw new TableNotExistException();
        }
        if ($newTableName != $table) {
            if (!$this->updateTableName($table, $newTableName)) {
                return false;
            }
            $table = $newTableName;
        }
        $arr = $this->connection->getRawColumns($table);
        $existingColumns = [];
        foreach ($arr as $column) {
            $existingColumns[$column['name']] = $column['type'];
        }
        if (!$this->addNewColumns($table, $existingColumns, $columns)) {
            return false;
        }
        if (!$this->changeExistingColumn($table, $existingColumns, $columns)) {
            return false;
        }
        return true;
    }

    /**
     * @inheritDoc
     */
    public function dropTableIfExist(string $name)
    {
        $this->connection->dropTableIfExist($name);
        $logView = $this->logViewService->findByTable($name);
        if (!empty($logView)) {
            $graph = $logView->getGraph();
            foreach ($graph->getLines() as $graphLine) {
                $graph->removeLine($graphLine);
                $this->em->remove($graphLine);
            }
            $this->em->remove($graph);
            $this->em->remove($logView);
            $this->em->flush();
        }
    }

    /**
     * @inheritDoc
     */
    public function checkColumnBelongToTable(string $table, ?string $column): bool
    {
        if (!$this->connection->tableExists($table)) {
            throw new TableNotExistException();
        }
        if (empty($column)) {
            return true;
        }
        $columns = $this->connection->getRawColumns($table);
        foreach ($columns as $col) {
            if ($col['name'] == $column) {
                return true;
            }
        }
        throw new ColumnNotExistException();
    }

    /**
     * @inheritDoc
     */
    public function removeTableColumn(string $table, string $column)
    {
        if (!$this->connection->tableExists($table)) {
            throw new TableNotExistException();
        }
        $columns = $this->connection->getRawColumns($table);
        $exist = false;
        foreach ($columns as $col) {
            if ($col['name'] == $column) {
                $exist = true;
                break;
            }
        }
        if (!$exist) {
            // not exist or already deleted
            return true;
        }
        $query = $this->makeDropColumnQuery($table, $column);
        if (!$this->connection->exec($query)) {
            return false;
        }
        return true;
    }

    /**
     * @inheritDoc
     */
    public function upgradeTable(string $table)
    {
        $columns = $this->connection->getRawColumns($table);
        $missing = $this->getSystemColumns();
        foreach ($columns as $column) {
            if (isset($missing[$column['name']])) {
                if ($missing[$column['name']] != $column['type']) {
                    throw new \LogicException('Existing "'.$column['name'].'" column but type is not '.$missing[$column['name']]);
                }
                unset($missing[$column['name']]);
            }
        }
        foreach ($missing as $column => $type) {
            $query = $this->makeAlertAddColumnQuery($table, ['name' => $column, 'type' => $type]);
            $this->connection->exec($query);
            if ($column == '_id') {
                $query = "ALTER TABLE {$table} ADD INDEX _id _id TYPE bloom_filter GRANULARITY 512";
                $this->connection->exec($query);
            }
        }
    }

    private function getSystemColumns(): array
    {
        return ['timestamp' => 'DateTime', '_id' => 'UUID'];
    }

    public function isSystemColumn(string $column): bool
    {
        $columns = $this->getSystemColumns();
        return isset($columns[$column]);
    }
}
