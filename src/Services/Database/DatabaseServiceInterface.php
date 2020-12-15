<?php


namespace App\Services\Database;


use App\Entity\Table;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\TableExistException;

interface DatabaseServiceInterface
{
    public function syncAllTableToSystem();

    /**
     * @param string $name
     * @param array $columns
     * @return Table|null
     * @throws TableExistException
     * @throws \Doctrine\DBAL\Exception
     */
    public function createTable(string $name, array $columns): ?Table;

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
