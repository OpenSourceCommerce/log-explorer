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
    public function getMinWidth(): int
    {
        return 3;
    }

    /**
     * @inheritDoc
     */
    public function getMinHeight(): int
    {
        return 2;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return WidgetConstant::NAME_PIE_CHART;
    }
}
