<?php


namespace App\Services\LogView;


use App\Entity\Column;
use App\Entity\LogView;
use App\Entity\DemoLogView;
use App\Entity\Table;

interface LogViewServiceInterface
{
    /**
     * @return DemoLogView
     */
    public function getDefault(): DemoLogView;

    /**
     * @param Table $table
     * @param string|null $name
     * @return mixed
     */
    public function createLogView(Table $table, ?string $name): LogView;

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
}
