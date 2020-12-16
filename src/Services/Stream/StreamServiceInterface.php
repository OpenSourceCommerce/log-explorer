<?php


namespace App\Services\Stream;


use App\Entity\GraphLine;

interface StreamServiceInterface
{
    /**
     * Get logs in range
     * @param string $table
     * @param array $options
     * @return mixed
     * @throws \Doctrine\DBAL\Exception
     */
    public function getLogsInRange(string $table, array $options = []);

    /**
     * Get log summary in range
     * @param string $table
     * @param string $column
     * @param array $options
     * @return mixed
     * @throws \Doctrine\DBAL\Exception
     */
    public function getLogSummaryInRange(string $table, string $column, array $options = []);

    /**
     * @param \DateTimeInterface $from
     * @param \DateTimeInterface $to
     * @param int $numOfPoint
     * @return int
     */
    public function getGraphOffsetInSeconds(\DateTimeInterface $from, \DateTimeInterface $to, int $numOfPoint): int;

    /**
     * @param string $table
     * @param GraphLine $line
     * @param int $offsetInSeconds
     * @param array $options
     * @return array
     * @throws \Doctrine\DBAL\Exception
     */
    public function getLogGraphInRange(string $table, GraphLine $line, int $offsetInSeconds, array $options = []): array;
}
