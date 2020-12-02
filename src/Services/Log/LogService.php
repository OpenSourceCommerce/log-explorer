<?php


namespace App\Services\Log;


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
    public function getColumns(string $table)
    {
        return $this->connection->getColumns($table);
    }

    /**
     * @inheritDoc
     */
    public function getColumnsName(string $table)
    {
        $columns = $this->getColumns($table);
        $columns = array_keys($columns);

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

        foreach ($data as $column => $value) {
            $builder->setValue($column, ":{$column}")
                ->setParameter(":{$column}", $value);

        }

        $builder->execute();
    }
}
