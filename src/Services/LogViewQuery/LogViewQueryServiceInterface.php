<?php


namespace App\Services\LogViewQuery;


use App\Entity\LogView;
use App\Entity\LogViewQuery;
use App\Entity\User;

interface LogViewQueryServiceInterface
{
    /**
     * @param LogView $logView
     * @param LogViewQuery $query
     * @param User $user
     * @return LogViewQuery
     */
    public function create(LogView $logView, LogViewQuery $query, User $user): LogViewQuery;

    /**
     * @param LogViewQuery $query
     * @return LogViewQuery
     */
    public function update(LogViewQuery $query): LogViewQuery;

    /**
     * @param LogViewQuery $query
     * @return mixed
     */
    public function delete(LogViewQuery $query);
}
