<?php


namespace App\Services\Clickhouse;


use Doctrine\DBAL\Exception;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\DBAL\Schema\AbstractSchemaManager;

interface ConnectionInterface
{
    /**
     * @return boolean
     */
    public function ping();

    /**
     * @param string $sql
     * @param array $params
     * @param array $types
     * @return int
     * @throws Exception
     */
    public function exec(string $sql, array $params = [], array $types = []): int;

    /**
     * @return AbstractSchemaManager
     */
    public function getSchemaManager();

    /**
     * @param string $query
     * @param array $params
     * @param array $types
     * @throws Exception
     */
    public function fetchAll(string $query, array $params = [], array $types = []);

    /**
     * @param string $query
     * @param array $params
     * @param array $types
     * @throws Exception
     */
    public function fetchAllInSingleThread(string $query, array $params = [], array $types = []);

    /**
     * @param string $query
     * @param array $params
     * @param array $types
     * @throws Exception
     */
    public function fetchColumn(string $query, array $params = [], array $types = []);

    /**
     * @param string $query
     * @param array $params
     * @param int $column
     * @param array $types
     * @throws Exception
     */
    public function fetchOne(string $query, array $params = [], $column = 0, array $types = []);

    /**
     * @return QueryBuilder
     */
    public function createQueryBuilder();

    /**
     * @return \Doctrine\DBAL\Platforms\AbstractPlatform|mixed
     * @throws Exception
     */
    public function getDatabasePlatform();

    /**
     * @param string $table
     * @param array $data
     * @return boolean
     */
    public function insert(string $table, array $data);

    /**
     * Get all column name of the table
     *
     * @param string $table
     * @return array
     */
    public function getRawColumns(string $table): array;

    /**
     * Check table existing
     *
     * @param string $table
     * @return bool
     */
    public function tableExists(string $table): bool;

    /**
     * Get all tables
     * @return string[]|array
     */
    public function getTables(): array;

    /**
     * @param string $table
     */
    public function dropTableIfExist(string $table);
}
