<?php


namespace App\Services\Log;


use App\Helper\StringHelper;
use App\Services\Clickhouse\Connection;

/**
 * Class LogService
 * @package App\Services\Log
 */
class LogService implements LogServiceInterface
{
    /**
     * @var Connection
     */
    private $connection;

    /**
     * LogService constructor.
     * @param Connection $connection
     */
    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @inheritDoc
     */
    public function getColumnsName(string $table)
    {
        $columns = $this->connection->getRawColumns($table);
        $columns = array_column($columns, 'name');

        foreach ($columns as $index => $column) {
            $columns[$index] = preg_replace('/[\W]/', '', $column);
        }

        return $columns;
    }

    /**
     * @inheritDoc
     */
    public function addItems(string $table, array $data)
    {
        $builder = $this->connection->createQueryBuilder()
            ->insert($table);

        $hasId = false;
        foreach ($data as $column => $value) {
            $builder->setValue($column, ":{$column}")
                ->setParameter(":{$column}", $value);
            if ($column === '_id') {
                $hasId = true;
            }
        }
        if (!$hasId) {
            $builder->setValue('_id', ':_id')
                ->setParameter('_id', StringHelper::uuid());
        }

        $builder->execute();
    }
}
