<?php

namespace App\Services\Export;

use App\Entity\Export;
use App\Entity\User;

interface ExportServiceInterface
{
    /**
     * @param Export $export
     * @return Export
     */
    public function createOrUpdate(Export $export): Export;

    /**
     * @return mixed
     */
    public function findAll();

    /**
     * @param int|null $limit
     * @return array
     */
    public function findNotProcessed(?int $limit = 1): array;

    /**
     * @param string $filename
     * @param string $format
     * @param array $data
     * @return string
     */
    public function export(string $filename, string $format, array $data): ?string;

    /**
     * @param string $filename
     * @param array $data
     * @return mixed
     */
    public function exportCsv(string $filename, array $data): ?string;

    /**
     * @param string $filename
     * @param array $data
     * @return mixed
     */
    public function exportJson(string $filename, array $data): ?string;

    /**
     * @return mixed
     */
    public function findExpiredExports(int $limit): array;

    /**
     * @param Export $export
     * @return mixed
     */
    public function removeExport(Export $export);

    /**
     * @param $id
     * @return mixed
     */
    public function findById($id);

    /**
     * @param int $limit
     * @return mixed
     */
    public function findExports(int $limit = 20);

    /**
     * @param Export[] $exports
     * @return mixed
     */
    public function removeExports(array $exports = []);
}
