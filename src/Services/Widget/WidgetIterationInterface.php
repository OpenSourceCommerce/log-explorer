<?php


namespace App\Services\Widget;


use App\Entity\Widget;
use App\Widget\WidgetInterface;

interface WidgetIterationInterface
{
    /**
     * @return WidgetInterface[]|array
     */
    public function getWidgets(): array;

    /**
     * @param Widget $entity
     * @return WidgetInterface
     */
    public function getWidgetFromEntity(Widget $entity): WidgetInterface;
}
