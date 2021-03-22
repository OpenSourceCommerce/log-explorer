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
     * @param int $type
     * @return WidgetInterface
     */
    public function widgetFromType(int $type): WidgetInterface;

    /**
     * @param Widget $entity
     * @return WidgetInterface
     */
    public function getWidgetFromEntity(Widget $entity): WidgetInterface;
}
