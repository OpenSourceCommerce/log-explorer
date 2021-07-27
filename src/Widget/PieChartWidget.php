<?php


namespace App\Widget;


use App\Constant\WidgetConstant;
use Doctrine\DBAL\Query\QueryBuilder;

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

    /**
     * @inheritDoc
     */
    public function getQueryBuilder(): QueryBuilder
    {
        $builder = $this->createQueryBuilder()
            ->select($this->attributes->getColumn().' AS label')
            ->addSelect('COUNT() AS value')
            ->from($this->attributes->getTable())
            ->groupBy($this->attributes->getColumn())
            ->orderBy('value', $this->attributes->isOrderDesc() ? 'DESC' : 'ASC')
        ;
        if ($this->attributes->getSize()) {
            $builder->setMaxResults($this->attributes->getSize());
        }
        if ($this->attributes->getQuery()) {
            $builder->andWhere($this->attributes->getQuery());
        }
        return $builder;
    }
}
