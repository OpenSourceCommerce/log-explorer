<?php


namespace App\Services\Log;


use Doctrine\DBAL\Exception;

/**
 * Interface LogServiceInterface
 * @package App\Services\Log
 */
interface LogServiceInterface
{
    /**
     * Get all columns of the nginx_access table
     *
     * @param string $table
     * @return mixed
     */
    public function getColumns(string $table);

    /**
     * Get all column name of the nginx_access table
     *
     * @param string $table
     * @return mixed
     */
    public function getColumnsName(string $table);

    /**
     * Add new Log data
     *
     * @param string $table
     * @param array $data
     * @return mixed
     * @throws Exception
     */
    public function addItems(string $table, array $data);
}
