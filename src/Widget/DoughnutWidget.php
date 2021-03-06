<?php


namespace App\Widget;


use App\Constant\WidgetConstant;

class DoughnutWidget extends PieChartWidget
{

    /**
     * @inheritDoc
     */
    public function getType(): int
    {
        return WidgetConstant::TYPE_DOUGHNUT;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return WidgetConstant::NAME_DOUGHNUT;
    }
}
