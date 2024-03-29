<?php


namespace App\Services\LogView;


use App\Entity\Graph;
use App\Entity\LogView;

interface LogViewServiceInterface
{
    /**
     * Get default log view
     * @return LogView|null
     */
    public function getDefault(): ?LogView;

    /**
     * @param string $table
     * @param Graph $graph
     * @param string|null $name
     * @param bool $flush
     * @return mixed
     */
    public function createLogView(string $table, Graph $graph, ?string $name, bool $flush = true): LogView;

    /**
     * List all LogView
     *
     * @return LogView[]|array
     */
    public function list(): array;

    /**
     * Get log view column setting
     *
     * @param LogView $logView
     * @return array
     */
    public function getColumnSetting(LogView $logView): array;

    /**
     * Find Log View by uuid
     *
     * @param string $uuid
     * @return LogView|null
     */
    public function findByUuid(string $uuid): ?LogView;

    /**
     * Get Log View Column
     *
     * @param LogView $logView
     * @return array
     */
    public function getVisibleColumns(LogView $logView): array;

    /**
     * @param LogView $logView
     * @param array $columns
     */
    public function setSummary(LogView $logView, array $columns);

    /**
     * @param string $name
     * @return LogView|null
     */
    public function findByTable(string $name): ?LogView;

    /**
     * @param LogView $logView
     * @param string $columnName
     * @param bool $visible
     * @param int $index
     * @param string|null $width
     */
    public function setVisibleColumn(LogView $logView, string $columnName, bool $visible, int $index, ?string $width = '');

    /**
     * @param LogView $logView
     * @param bool $visible
     */
    public function setVisibleColumns(LogView $logView, bool $visible);

    /**
     * @param string $table
     * @param string $newName
     */
    public function updateTableName(string $table, string $newName);
}
