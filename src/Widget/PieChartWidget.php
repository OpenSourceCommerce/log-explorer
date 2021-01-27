<?php


namespace App\Widget;


use App\Constant\WidgetConstant;

class PieChartWidget extends WidgetAbstract
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

    /**
     * @inheritDoc
     */
    protected function isValidData(array $data): bool
    {
        $row = reset($data);
        if (count($row) !== 2) {
            return false;
        }
        return isset($row['label']) && isset($row['value']);
    }
}
