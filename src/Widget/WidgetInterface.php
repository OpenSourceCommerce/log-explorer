<?php


namespace App\Widget;


use App\Exceptions\BadSqlException;
use App\Exceptions\NoDataException;

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
     * @return string
     */
    public function getQuery(): string;

    /**
     * @return bool
     * @throws BadSqlException
     * @throws NoDataException
     */
    public function isValid(): bool;
}
