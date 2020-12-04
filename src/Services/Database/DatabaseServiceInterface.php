<?php


namespace App\Services\Database;


use App\Exceptions\InvalidSqlQueryException;
use App\Exceptions\TableExistException;

interface DatabaseServiceInterface
{
    /**
     * @param string $query
     * @return bool
     * @throws InvalidSqlQueryException
     * @throws TableExistException
     * @throws \Doctrine\DBAL\Exception
     */
    public function processQuery(string $query): bool;
}
