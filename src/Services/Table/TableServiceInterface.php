<?php


namespace App\Services\Table;


use App\Entity\Table;

interface TableServiceInterface
{
    /**
     * @param string $name
     * @return boolean
     */
    public function isTableExist(string $name);

    /**
     * @param string $name
     * @param bool $flush
     * @return Table
     */
    public function createTable(string $name, $flush = true);
}
