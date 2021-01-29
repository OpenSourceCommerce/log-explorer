<?php


namespace App\Widget;


use App\Constant\WidgetConstant;

class CounterWidget extends WidgetAbstract
{

    /**
     * @inheritDoc
     */
    public function getType(): int
    {
        return WidgetConstant::TYPE_COUNTER;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return WidgetConstant::NAME_COUNTER;
    }

    /**
     * @inheritDoc
     */
    protected function isValidData(array $data): bool
    {
        if (count($data) !== 1) {
            return false;
        }
        $row = $data[0];
        if (count($row) !== 1) {
            return false;
        }
        return true;
    }

    public function getData()
    {
        $data = parent::getData();
        if (!empty($data)) {
            return reset($data[0]);
        }
        return null;
    }
}
