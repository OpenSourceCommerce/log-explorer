<?php

namespace App\Services\Clickhouse;

interface ClickhouseServiceInterface
{
    /**
     * @return string[]|array
     */
    public function getTypes(): array;
}
