<?php


namespace App\Services\Dashboard;


use App\Entity\Dashboard;

interface DashboardServiceInterface
{
    /**
     * @param string $uuid
     * @return Dashboard
     */
    public function fromUuid(string $uuid);
}
