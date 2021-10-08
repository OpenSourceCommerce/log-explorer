<?php


namespace App\Widget;


use App\Constant\WidgetConstant;

class BarWidget extends LineWidget
{

    /**
     * @inheritDoc
     */
    public function getType(): int
    {
        return WidgetConstant::TYPE_BAR;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return WidgetConstant::NAME_BAR;
    }
}
