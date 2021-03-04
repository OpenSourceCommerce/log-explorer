<?php


namespace App\Widget;


use App\Constant\WidgetConstant;

class PieChartWidget extends TableWidget
{

    /**
     * @inheritDoc
     */
    public function getType(): int
    {
        return WidgetConstant::TYPE_PIE_CHART;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return WidgetConstant::NAME_PIE_CHART;
    }
}
