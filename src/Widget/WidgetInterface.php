<?php


namespace App\Widget;


use App\Exceptions\BadSqlException;
use App\Exceptions\NoDataException;
use Doctrine\DBAL\Exception;

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
     * @param string $title
     * @return self
     */
    public function setTitle(string $title): self;

    /**
     * @return string
     */
    public function getTitle(): string;

    /**
     * @param string $query
     * @return self
     */
    public function setQuery(string $query): self;

    /**
     * @return string
     */
    public function getQuery(): string;

    /**
     * Get query data
     * @return mixed
     * @throws Exception
     */
    public function getData();

    /**
     * @return bool
     * @throws BadSqlException
     * @throws NoDataException
     */
    public function isValid(): bool;
}
