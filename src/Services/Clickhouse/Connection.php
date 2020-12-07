<?php

namespace App\Services\Clickhouse;

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
        return $this->connection->ping();
    }

    /**
     * @inheritDoc
     */
    public function exec(string $sql, array $params = [], array $types = [])
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
    public function getColumns(string $table)
    {
        return $this->getSchemaManager()->listTableColumns($table);
    }

    /**
     * @inheritDoc
     */
    public function tableExists(string $table): bool
    {
        return $this->connection->getSchemaManager()->tablesExist($table);
    }

    /**
     * @inheritDoc
     */
    public function getTables(): array
    {
        return $this->connection->getSchemaManager()->listTableNames();
    }
}
