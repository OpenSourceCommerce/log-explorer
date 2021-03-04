<?php


namespace App\Widget;


use Doctrine\DBAL\Query\QueryBuilder;

interface WidgetInterface
{
    /**
     * @return int
     */
    public function getType(): int;

    /**
     * @return string
     */
    public function getName(): string;

    /**
     * If this widget has single result like COUNT
     */
    public function hasSingleResult(): bool;

    /**
     * Set widget attributes
     * @param WidgetAttributesInterface $attributes
     */
    public function setAttributes(WidgetAttributesInterface $attributes);

    /**
     * Get widget attributes
     * @return WidgetAttributesInterface|null
     */
    public function getAttributes(): ?WidgetAttributesInterface;

    /**
     * @return QueryBuilder
     */
    public function getQueryBuilder(): QueryBuilder;
}
