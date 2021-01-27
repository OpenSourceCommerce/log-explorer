<?php


namespace App\Services\Widget;


use App\Services\Clickhouse\Connection;
use App\Widget\CounterWidget;
use App\Widget\PieChartWidget;
use App\Widget\TableWidget;

class WidgetIteration implements WidgetIterationInterface
{
    private $list;

    public function __construct(Connection $connection)
    {
        $this->list = [
           new CounterWidget($connection),
           new PieChartWidget($connection),
           new TableWidget($connection),
        ];
    }

    /**
     * @inheritDoc
     */
    public function getWidgets(): array
    {
        return $this->list;
    }
}
