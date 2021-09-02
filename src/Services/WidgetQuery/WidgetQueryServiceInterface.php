<?php


namespace App\Services\WidgetQuery;


use App\Entity\WidgetQuery;
use App\Entity\User;

interface WidgetQueryServiceInterface
{
    /**
     * @param WidgetQuery $query
     * @param User $user
     * @return WidgetQuery
     */
    public function create(WidgetQuery $query, User $user): WidgetQuery;

    /**
     * @param WidgetQuery $query
     * @return WidgetQuery
     */
    public function update(WidgetQuery $query): WidgetQuery;

    /**
     * @param WidgetQuery $query
     * @return mixed
     */
    public function delete(WidgetQuery $query);
}
