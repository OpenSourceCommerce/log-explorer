<?php


namespace App\Widget;


use App\Constant\WidgetConstant;
use Doctrine\DBAL\Query\QueryBuilder;

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
        return $builder;
    }
}
