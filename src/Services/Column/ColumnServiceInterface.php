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
    public function create(Table $table, array $data, $flush = true): Column;

    /**
     * @param Table $table
     * @param string $name
     * @return Column|null
     */
    public function findByName(Table $table, string $name): ?Column;

    /**
     * @param Column $column
     * @param array $data
     * @param bool $flush
     * @return Column
     */
    public function updateColumn(Column $column, array $data, bool $flush = true): Column;

    /**
     * @param Table $table
     * @param array $columnNames
     * @return bool
     */
    public function removeNotIn(Table $table, array $columnNames): bool;
}
