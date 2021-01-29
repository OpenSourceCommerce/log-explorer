<?php


namespace App\Services\Widget;


use App\Entity\Widget;
use App\Services\Clickhouse\Connection;
use App\Widget\CounterWidget;
use App\Widget\DoughnutWidget;
use App\Widget\PieChartWidget;
use App\Widget\TableWidget;
use App\Widget\WidgetInterface;

class WidgetIteration implements WidgetIterationInterface
{
    private $list;

    public function __construct(Connection $connection)
    {
        $this->list = [
           new CounterWidget($connection),
           new PieChartWidget($connection),
           new TableWidget($connection),
           new DoughnutWidget($connection),
        ];
    }

    private function widgetFromType(int $type): WidgetInterface
    {
        /** @var WidgetInterface $item */
        foreach ($this->list as $item) {
            if ($item->getType() == $type) {
                return $item;
            }
        }
        throw new \LogicException('Widget type "'.$type.'" does not exist');
    }

    /**
     * @inheritDoc
     */
    public function getWidgets(): array
    {
        return $this->list;
    }

    /**
     * @inheritDoc
     */
    public function getWidgetFromEntity(Widget $entity): WidgetInterface
    {
        $widget = $this->widgetFromType($entity->getType());
        $widget->setTitle($entity->getTitle());
        $widget->setQuery($entity->getQuery());
        return $widget;
    }
}
