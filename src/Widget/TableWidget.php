<?php


namespace App\Widget;


use App\Constant\WidgetConstant;

class TableWidget extends WidgetAbstract
{

    /**
     * @inheritDoc
     */
    public function getType(): int
    {
        return WidgetConstant::TYPE_TABLE;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return WidgetConstant::NAME_TABLE;
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
