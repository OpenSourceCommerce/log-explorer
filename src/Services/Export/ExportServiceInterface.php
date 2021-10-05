<?php

namespace App\Services\Export;

use App\Entity\Export;
use App\Entity\User;

interface ExportServiceInterface
{
    const MODE_SINGLE_FILE = 0;
    const MODE_NEW_FILE = 1;
    const MODE_APPEND_FILE = 2;

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
     * @param Export $export
     * @return string
     */
    public function export(Export $export): ?string;

    /**
     * @param string $subDirectory
     * @param string $filename
     * @param array $data
     * @param int $mode
     * @return mixed
     */
    public function exportCsv(string $subDirectory, string $filename, array $data, int $mode = self::MODE_SINGLE_FILE);

    /**
     * @param string $subDirectory
     * @param string $filename
     * @param array $data
     * @param int $mode
     * @param bool $isEnd
     * @return mixed
     */
    public function exportJson(string $subDirectory, string $filename, array $data, int $mode = self::MODE_SINGLE_FILE, bool $isEnd = false);

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
