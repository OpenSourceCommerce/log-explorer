<?php


namespace App\Services\Dashboard;


use App\Entity\Dashboard;

class DashboardService implements DashboardServiceInterface
{

    /**
     * @inheritDoc
     */
    public function fromUuid(string $uuid)
    {
        return new Dashboard();
    }
}