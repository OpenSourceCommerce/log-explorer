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
     * @param array $data
     * @return bool
     * @throws TableNotExistException
     * @throws \Doctrine\DBAL\Exception
     * @throws ActionDeniedException
     */
    public function updateTable(string $table, array $data): bool;

    /**
     * @param string $name
     */
    public function dropTableIfExist(string $name);

    /**
     * @param string $table
     * @param string|null $column
     * @return bool
     * @throws TableNotExistException
     * @throws ColumnNotExistException
     */
    public function checkColumnBelongToTable(string $table, ?string $column): bool;

    /**
     * @param string $table
     * @param string $column
     * @throws TableNotExistException
     * @throws \Doctrine\DBAL\Exception
     */
    public function removeTableColumn(string $table, string $column);

    /**
     * Upgrade database table
     * @param string $table
     * @throws \Doctrine\DBAL\Exception
     */
    public function upgradeTable(string $table);

    public function isSystemColumn(string $column): bool;
}
