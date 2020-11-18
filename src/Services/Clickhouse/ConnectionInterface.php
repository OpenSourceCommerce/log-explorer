<?php


namespace App\Services\Clickhouse;


use Doctrine\DBAL\Exception;

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
     * @throws Exception
     */
    public function exec(string $sql, array $params = [], array $types = []);

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
    public function fetchColumn(string $query, array $params = [], array $types = []);

    /**
     * @param string $query
     * @param array $params
     * @param int $column
     * @param array $types
     * @throws Exception
     */
    public function fetchOne(string $query, array $params = [], $column = 0, array $types = []);
}