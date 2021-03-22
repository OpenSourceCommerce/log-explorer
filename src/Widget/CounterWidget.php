<?php


namespace App\Widget;


use App\Constant\WidgetConstant;
use Doctrine\DBAL\Query\QueryBuilder;

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
    public function getMinWidth(): int
    {
        return 3;
    }

    /**
     * @inheritDoc
     */
    public function getMinHeight(): int
    {
        return 1;
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
    public function hasSingleResult(): bool
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function getQueryBuilder(): QueryBuilder
    {
        $builder = $this->createQueryBuilder()
            ->select('COUNT() AS value')
            ->from($this->attributes->getTable())
            ->orderBy('value', 'DESC')
            ;
        if ($this->attributes->getQuery()) {
            $builder->andWhere($this->attributes->getQuery());
        }
        return $builder;
    }
}
