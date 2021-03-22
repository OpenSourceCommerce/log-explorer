<?php


namespace App\Services\Stream;


use App\Entity\Dashboard;
use App\Entity\GraphLine;
use App\Widget\WidgetInterface;

interface StreamServiceInterface
{
    /**
     * @param string $trackId
     * @return string
     */
    public function trackIdLog(string $trackId): string;

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

    /**
     * @param string $name
     * @param array $options
     */
    public function getTotalLogsInRange(string $name, array $options = []);

    /**
     * @param string $trackId
     * @return array|false
     */
    public function getLogByTrackId(string $trackId);

    /**
     * @param Dashboard $dashboard
     * @param WidgetInterface $widgetItem
     * @param array $options
     * @return mixed
     */
    public function getWidgetData(Dashboard $dashboard, WidgetInterface $widgetItem, array $options = []);
}
