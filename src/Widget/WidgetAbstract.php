<?php


namespace App\Widget;


use App\Services\Clickhouse\Connection;
use Doctrine\DBAL\Query\QueryBuilder;

abstract class WidgetAbstract implements WidgetInterface
{
    /** @var Connection */
    private $connection;

    /** @var WidgetAttributesInterface */
    protected $attributes;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @inheritDoc
     */
    public function hasSingleResult(): bool
    {
        return false;
    }

    /**
     * @inheritDoc
     */
    public function setAttributes(WidgetAttributesInterface $attributes)
    {
        $this->attributes = $attributes;
    }

    public function getAttributes(): ?WidgetAttributesInterface
    {
        return $this->attributes;
    }

    protected function createQueryBuilder(): QueryBuilder
    {
        return $this->connection->createQueryBuilder();
    }
}
