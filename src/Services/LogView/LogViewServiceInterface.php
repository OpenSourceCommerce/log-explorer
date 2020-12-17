<?php


namespace App\Services\LogView;


use App\Entity\Column;
use App\Entity\Graph;
use App\Entity\LogView;
use App\Entity\Table;

interface LogViewServiceInterface
{
    /**
     * Get default log view
     * @return LogView|null
     */
    public function getDefault(): ?LogView;

    /**
     * @param Table $table
     * @param Graph $graph
     * @param string|null $name
     * @param bool $flush
     * @return mixed
     */
    public function createLogView(Table $table, Graph $graph, ?string $name, bool $flush = true): LogView;

    /**
     * List all LogView
     *
     * @return array
     */
    public function list(): array;

    /**
     * Get log view column setting
     *
     * @param LogView $logView
     * @return array
     */
    public function getColumnSetting(LogView $logView);

    /**
     * setup log view column setting
     *
     * @param LogView $logView
     * @return array
     */
    public function setupColumnSetting(LogView $logView);

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
     * @return mixed
     */
    public function getVisibleColumns(LogView $logView);

    /**
     * @param LogView $logView
     * @param array $columns
     */
    public function setSummary(LogView $logView, array $columns);
}
