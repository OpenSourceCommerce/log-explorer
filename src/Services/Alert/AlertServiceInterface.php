<?php


namespace App\Services\Alert;


use App\Entity\Alert;

interface AlertServiceInterface
{
    /**
     * @return mixed
     */
    public function findAll();

    /**
     * @param Alert $alert
     * @return mixed
     */
    public function createOrUpdate(Alert $alert): Alert;

    /**
     * @param Alert $alert
     * @return bool
     */
    public function delete(Alert $alert): bool;

    /**
     * @param Alert $alert
     * @return Alert
     */
    public function updateStatus(Alert $alert): Alert;

    /**
     * @return mixed
     */
    public function findAvailableAlerts(int $limit = 20);

    /**
     * @param Alert $alert
     * @return mixed
     */
    public function execute(Alert $alert);
}
