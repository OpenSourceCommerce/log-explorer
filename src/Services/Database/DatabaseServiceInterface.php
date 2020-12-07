<?php


namespace App\Services\Database;


use App\Entity\Table;
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
}
