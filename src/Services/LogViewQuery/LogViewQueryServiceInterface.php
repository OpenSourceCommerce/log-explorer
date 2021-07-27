<?php


namespace App\Services\LogViewQuery;


use App\Entity\LogView;
use App\Entity\LogViewQuery;

interface LogViewQueryServiceInterface
{
    /**
     * @param LogView $logView
     * @param LogViewQuery $query
     * @return LogViewQuery
     */
    public function create(LogView $logView, LogViewQuery $query): LogViewQuery;

    /**
     * @param LogViewQuery $query
     * @return LogViewQuery
     */
    public function update(LogViewQuery $query): LogViewQuery;
}
