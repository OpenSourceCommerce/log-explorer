<?php


namespace App\Services\Database;


use App\Entity\Table;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\InvalidSqlQueryException;
use App\Exceptions\TableExistException;

interface DatabaseServiceInterface
{
    /**
     * @param string $query
     * @return Table|false
     * @throws InvalidSqlQueryException
     * @throws TableExistException
     * @throws \Doctrine\DBAL\Exception
     */
    public function processQuery(string $query);

    public function syncAllTableToSystem();

    /**
     * @param string $name
     * @param array $columns
     * @return Table
     * @throws TableExistException
     * @throws \Doctrine\DBAL\Exception
     */
    public function createTable(string $name, array $columns): Table;

    /**
     * @param Table $table
     * @param string $name
     * @param array $columns
     * @return Table
     * @throws TableExistException
     * @throws \Doctrine\DBAL\Exception
     * @throws ActionDeniedException
     */
    public function updateTable(Table $table, string $name, array $columns): Table;
}
