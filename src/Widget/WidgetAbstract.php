<?php


namespace App\Widget;


use App\Exceptions\BadSqlException;
use App\Exceptions\NoDataException;
use App\Services\Clickhouse\Connection;
use Doctrine\DBAL\Exception;

abstract class WidgetAbstract implements WidgetInterface
{
    private $title;
    private $query;
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @param string $title
     * @return WidgetInterface
     */
    public function setTitle(string $title): WidgetInterface
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $query
     * @return WidgetInterface
     */
    public function setQuery(string $query): WidgetInterface
    {
        $this->query = $query;
        return $this;
    }

    /**
     * @return string
     */
    public function getQuery(): string
    {
        return $this->query;
    }

    /**
     * @inheritDoc
     */
    public function isValid(): bool
    {
        try {
            $data = $this->connection->fetchAll($this->getQuery());
        } catch (Exception $e) {
            throw new BadSqlException('Invalid input query');
        }
        if (empty($data)) {
            throw new NoDataException('No data return so query can not be validate');
        }
        if (!$this->isValidData($data)) {
            throw new BadSqlException('Invalid select query');
        }
        return true;
    }

    /**
     * @param array $data
     * @return bool
     */
    protected abstract function isValidData(array $data): bool;
}
