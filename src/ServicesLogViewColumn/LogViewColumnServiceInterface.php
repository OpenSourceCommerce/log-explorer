<?php


namespace App\ServicesLogViewColumn;


use App\Entity\Column;
use App\Entity\LogView;
use App\Entity\LogViewColumn;

/**
 * Interface LogViewColumnServiceInterface
 * @package App\ServicesLogViewColumn
 */
interface LogViewColumnServiceInterface
{
    /**
     * Update log view column setting
     *
     * @param LogView $logView
     * @param Column $column
     * @param array $data
     * @return mixed
     */
    public function updateColumnSetting(LogView $logView, Column $column, array $data): LogViewColumn;

    /**
     * @param LogView $logView
     * @return mixed
     */
    public function getColumns(LogView $logView);

    /**
     * @param LogView $logView
     * @param Column $column
     * @param bool $flush
     */
    public function remove(LogView $logView, Column $column, bool $flush = true);
}
