<?php


namespace App\Services\Stream;


interface StreamServiceInterface
{
    /**
     * Get logs in range
     * @param string $table
     * @param \DateTimeInterface $from
     * @param array $options
     * @return mixed
     */
    public function getLogsInRange(string $table, \DateTimeInterface $from, array $options = []);

    /**
     * Get log summary in range
     * @param string $table
     * @param string $column
     * @param \DateTimeInterface $from
     * @param array $options
     * @return mixed
     */
    public function getLogSummaryInRange(string $table, string $column, \DateTimeInterface $from, array $options = []);

    /**
     * @param \DateTimeInterface $from
     * @param \DateTimeInterface $to
     * @param int $numOfPoint
     * @return int
     */
    public function getGraphOffsetInSeconds(\DateTimeInterface $from, \DateTimeInterface $to, int $numOfPoint);

    /**
     * @param string $table
     * @param array $column
     * @param \DateTimeInterface $from
     * @param int $offsetInSeconds
     * @param array $options
     * @return array
     */
    public function getLogGraphInRange(string $table, array $column, \DateTimeInterface $from, int $offsetInSeconds, array $options = []);
}