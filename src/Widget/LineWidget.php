<?php


namespace App\Widget;


use App\Constant\WidgetConstant;

class LineWidget extends PieChartWidget
{

    /**
     * @inheritDoc
     */
    public function getType(): int
    {
        return WidgetConstant::TYPE_LINE;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return WidgetConstant::NAME_LINE;
    }
}
