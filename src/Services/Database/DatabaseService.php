<?php


namespace App\Services\Database;

use App\Exceptions\TableExistException;
use App\Exceptions\TableNotExistException;
use App\Services\Clickhouse\ClickhouseServiceInterface;
use App\Services\Clickhouse\ConnectionInterface;
use App\Services\Graph\GraphServiceInterface;
use App\Services\GraphLine\GraphLineServiceInterface;
use App\Services\LogView\LogViewServiceInterface;
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
        $hasTimestamp = false;
        foreach ($columns as $k => $column) {
            if ($column['name'] === 'timestamp') {
                if ($column['type'] !== 'DateTime') {
                    $columns[$k]['type'] = 'DateTime';
                }
                $hasTimestamp = true;
                break;
            }
        }
        if (!$hasTimestamp) {
            $columns[] = [
                'name' => 'timestamp',
                'type' => 'DateTime',
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
        $query .= ") ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp))
ORDER BY timestamp\n";
        if (!empty($options['ttl'])) {
            $query .= 'TTL '.$options['ttl']."\n";
        }
        $query .= 'SETTINGS index_granularity = 8192';

        return $query;
    }

    private function makeAlertTableQuery(string $tableName, array $column): string
    {
        return "ALTER TABLE {$tableName} ADD COLUMN `{$column['name']}` {$column['type']}";
    }

    /**
     * @inheritDoc
     */
    public function updateTable(string $table, array $columns): bool
    {
        if (!$this->connection->tableExists($table)) {
            throw new TableNotExistException();
        }
        $existingColumns = $this->connection->getRawColumns($table);
        $existingColumns = array_column($existingColumns, 'name');
        $existingColumns = array_flip($existingColumns);
        foreach ($columns as $column) {
            if (isset($existingColumns[$column['name']])) {
                continue;
            }
            $query = $this->makeAlertTableQuery($table, $column);
            if (!$this->connection->exec($query)) {
                return false;
            }
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
}
