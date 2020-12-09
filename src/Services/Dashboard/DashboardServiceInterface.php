<?php


namespace App\Services\Dashboard;


use App\Entity\DemoDashboard;

interface DashboardServiceInterface
{
    /**
     * @return DemoDashboard
     */
    public function getDefault(): DemoDashboard;
}
