<?php

namespace App\Services\Clickhouse;

use App\ClickHouse\ClickHouseStatement;
use ClickHouseDB\Client;
use Doctrine\DBAL\Abstraction\Result;
use Doctrine\ORM\EntityManagerInterface;
use \FOD\DBALClickHouse\Connection as ClickHouseConnection;
use Throwable;

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
        return $this->connection->ping();
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
        return $this->connection->getSchemaManager();
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
        /** @var \App\ClickHouse\ClickHouseConnection $conn */
        $conn = $this->connection->getWrappedConnection();
        $maxThreads = $conn->getClickHouseClient()->settings()->get('max_threads');
        $conn->getClickHouseClient()->settings()->set('max_threads', 1);
        try {
            $ret = $this->connection->fetchAllAssociative($query, $params, $types);
        } finally {
            $conn->getClickHouseClient()->settings()->set('max_threads', $maxThreads);
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

        $sql = $this->connection->getSchemaManager()->getDatabasePlatform()->getListTableColumnsSQL($table, $database);

        return $this->connection->fetchAllAssociative($sql);
    }

    /**
     * @inheritDoc
     */
    public function getColumns(string $table)
    {
        /** @var EntityManagerInterface $em */
//        $em->getConnection()->get
        return $this->getSchemaManager()->listTableColumns($table);
    }

    /**
     * @inheritDoc
     */
    public function tableExists(string $table): bool
    {
        $sql = "SELECT COUNT() AS c FROM system.tables WHERE database = '{$this->connection->getDatabase()}' AND engine != 'View' AND name = '{$table}'";
        $c = $this->connection->fetchColumn($sql);
        return $c == 1;
    }

    /**
     * @inheritDoc
     */
    public function getTables(): array
    {
        return $this->connection->getSchemaManager()->listTableNames();
    }

    /**
     * @inheritDoc
     */
    public function dropTableIfExist(string $table)
    {
        if ($this->tableExists($table)) {
            $this->connection->getSchemaManager()->dropTable($table);
        }
    }
}
