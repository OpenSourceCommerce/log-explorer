<?php


namespace App\Services\Database;

use App\Entity\Dashboard;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\ColumnNotExistException;
use App\Exceptions\TableExistException;
use App\Exceptions\TableNotExistException;
use Doctrine\DBAL\Query\QueryBuilder;

interface DatabaseServiceInterface
{
    /**
     * @param string $name
     * @param array $columns
     * @param array $options
     * @return bool
     * @throws TableExistException
     * @throws \Doctrine\DBAL\Exception
     */
    public function createTable(string $name, array $columns, array $options = []): bool;

    /**
     * @param string $table
     * @param array $columns
     * @return bool
     * @throws TableNotExistException
     * @throws \Doctrine\DBAL\Exception
     * @throws ActionDeniedException
     */
    public function updateTable(string $table, array $columns): bool;

    /**
     * @param string $name
     */
    public function dropTableIfExist(string $name);

    /**
     * @param string $table
     * @param string $column
     * @return bool
     * @throws TableNotExistException
     * @throws ColumnNotExistException
     */
    public function checkColumnBelongToTable(string $table, string $column): bool;
}
