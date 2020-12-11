<?php


namespace App\Services\LogView;


use App\Entity\LogView;
use App\Entity\DemoDashboard;
use App\Entity\Table;

interface LogViewServiceInterface
{
    /**
     * @return DemoDashboard
     */
    public function getDefault(): DemoDashboard;

    /**
     * @param Table $table
     * @param string|null $name
     * @return mixed
     */
    public function createDashboard(Table $table, ?string $name): LogView;
}
