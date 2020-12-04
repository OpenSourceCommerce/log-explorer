<?php


namespace App\Services\Column;


use App\Entity\Column;
use App\Entity\Table;

interface ColumnServiceInterface
{
    /**
     * @param Table $table
     * @param array $data
     * @param bool $flush
     * @return Column
     */
    public function create(Table $table, array $data, $flush = true);
}
