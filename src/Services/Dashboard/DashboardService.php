<?php


namespace App\Services\Dashboard;


use App\Entity\DemoDashboard;

class DashboardService implements DashboardServiceInterface
{

    /**
     * @inheritDoc
     */
    public function getDefault(): DemoDashboard
    {
        return new DemoDashboard();
    }
}
