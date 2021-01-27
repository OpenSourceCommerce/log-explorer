<?php


namespace App\Services\Widget;


use App\Widget\WidgetInterface;

interface WidgetIterationInterface
{
    /**
     * @return WidgetInterface[]|array
     */
    public function getWidgets(): array;
}
