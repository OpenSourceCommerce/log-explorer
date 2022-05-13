<?php

namespace App\Services\Clickhouse;

use Doctrine\ORM\EntityManagerInterface;
use \FOD\DBALClickHouse\Connection as ClickHouseConnection;

class Connection implements ConnectionInterface
{
    /** @var ClickHouseConnection */
    private $connection;

    public function __construct(ClickHouseConnection $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @inheritDoc
     */
    public function ping()
    {
        return $this->connection->getNativeConnection()->ping();
    }

    /**
     * @inheritDoc
     */
    public function exec(string $sql, array $params = [], array $types = []): int
    {
        return $this->connection->executeStatement($sql, $params, $types);
    }

    /**
     * @inheritDoc
     */
    public function getSchemaManager()
    {
        return $this->connection->createSchemaManager();
    }

    /**
     * @inheritDoc
     */
    public function fetchAll(string $query, array $params = [], array $types = [])
    {
        return $this->connection->fetchAllAssociative($query, $params, $types);
    }

    /**
     * @inheritDoc
     */
    public function fetchAllInSingleThread(string $query, array $params = [], array $types = [])
    {
        $conn = $this->connection->getNativeConnection();
        $maxThreads = $conn->settings()->get('max_threads');
        $conn->settings()->set('max_threads', 1);
        try {
            $ret = $this->connection->fetchAllAssociative($query, $params, $types);
        } finally {
            $conn->settings()->set('max_threads', $maxThreads);
        }
        return $ret;
    }

    /**
     * @inheritDoc
     */
    public function fetchColumn(string $query, array $params = [], array $types = [])
    {
        return $this->connection->fetchAssociative($query, $params, $types);
    }

    /**
     * @inheritDoc
     */
    public function fetchOne(string $query, array $params = [], $column = 0, array $types = [])
    {
        $ret = $this->connection->fetchOne($query, $params, $types);
        if ($ret) {
            return $ret[$column];
        }
        return false;
    }

    /**
     * @inheritDoc
     */
    public function createQueryBuilder()
    {
        return $this->connection->createQueryBuilder();
    }

    /**
     * @inheritDoc
     */
    public function getDatabasePlatform()
    {
        return $this->connection->getDatabasePlatform();
    }

    /**
     * @inheritDoc
     */
    public function insert(string $table, array $data)
    {
        return $this->connection->insert($table, $data);
    }

    /**
     * @inheritDoc
     */
    public function getRawColumns(string $table): array
    {
        $database = $this->connection->getDatabase();

        $sql = $this->connection->createSchemaManager()->getDatabasePlatform()->getListTableColumnsSQL($table, $database);

        return $this->connection->fetchAllAssociative($sql);
    }

    /**
     * @inheritDoc
     */
    public function getRawColumn(string $table, string $column): array
    {
        $columns = $this->getRawColumns($table);

        $columns = array_filter($columns, function ($item) use ($column) {
            return $item['name'] == $column;
        });

        if (empty($columns)) {
            return [];
        }

        return array_shift($columns);
    }

    /**
     * @inheritDoc
     */
    public function tableExists(string $table): bool
    {
        $sql = "SELECT COUNT() AS c FROM system.tables WHERE database = ? AND engine != ? AND name = ?";
        $c = $this->connection->fetchOne($sql, [$this->connection->getDatabase(), 'View', $table]);
        return $c == 1;
    }

    /**
     * @inheritDoc
     */
    public function getTables(): array
    {
        $sql = <<<SQL
SELECT name FROM system.tables WHERE database = ? AND engine != ?
SQL;
        return $this->connection->fetchFirstColumn($sql, [$this->connection->getDatabase(), 'View']);
    }

    /**
     * @inheritDoc
     */
    public function dropTableIfExist(string $table)
    {
        if ($this->tableExists($table)) {
            $this->connection->createSchemaManager()->dropTable($table);
        }
    }
}
