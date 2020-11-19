<?php

namespace App\Services\Clickhouse;

use Doctrine\DBAL\Exception;
use Doctrine\ORM\QueryBuilder;
use \FOD\DBALClickHouse\Connection as ClickHouseConnection;

class Connection implements ConnectionInterface
{
    /** @var ClickHouseConnection  */
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
}