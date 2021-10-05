<?php

namespace App\Services\Export;

interface DashboardExportImportServiceInterface
{
    /**
     * @param array|null $ids
     * @return string
     */
    public function exportWidget(?array $ids): string;

    /**
     * @param array|null $ids
     * @return string
     */
    public function exportDashboard(?array $ids): string;

    /**
     * @return string
     */
    public function exportAll(): string;

    /**
     * @return string
     */
    public function exportAllDashboard(): string;

    /**
     * @return string
     */
    public function exportAllWidget(): string;

    /**
     * @param array $data
     * @return mixed
     */
    public function import(array $data);
}
