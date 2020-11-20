<?php


namespace App\Entity;


class Dashboard
{
    private $table = 'nginx_access';

    private $columns = [
        [
            'name' => 'host',
            'title' => 'Host',
            'type' => 'text',
        ],
        [
            'name' => 'device_type',
            'title' => 'Device type',
            'type' => 'text',
        ],
        [
            'name' => 'ip',
            'title' => 'IP',
            'type' => 'text',
        ],
        [
            'name' => 'timestamp',
            'title' => 'Time',
            'type' => 'text',
        ],
        [
            'name' => 'status',
            'title' => 'Status',
            'type' => 'text',
        ],
    ];

    private $summaryColumns = [
        [
            'name' => 'status',
            'title' => 'Status',
        ],
        [
            'name' => 'device_type',
            'title' => 'Device',
        ],
    ];

    private $graphColumns = [
        [
            'name' => 'status',
            'title' => 'OK',
            'condition' => 'status < 300', // allow to set as query but need to check SQL injection!!!?
            'value' => '200', // only = or IN
            'color' => '#7F2',
        ],
        [
            'name' => 'status',
            'title' => 'NG',
            'condition' => 'status >= 300',
            'value' => [304, 499],
            'color' => '#444',
        ]
    ];

    private $graphNumberOfPoint = 12;
    private $graphFixedOffset = null;

    /**
     * @return string
     */
    public function getTable(): string
    {
        return $this->table;
    }

    /**
     * @param string $table
     * @return self
     */
    public function setTable(string $table): self
    {
        $this->table = $table;
        return $this;
    }

    /**
     * @return array
     */
    public function getColumns(): array
    {
        return $this->columns;
    }

    /**
     * @return array
     */
    public function getSummaryColumns(): array
    {
        return $this->summaryColumns;
    }

    /**
     * @return array
     */
    public function getGraphColumns(): array
    {
        return $this->graphColumns;
    }

    /**
     * Recommend to setup graph dynamic and optimize performance
     * @return int|null
     */
    public function getGraphNumberOfPoint(): ?int
    {
        return $this->graphNumberOfPoint;
    }

    /**
     * Get fixed offset in seconds, null if disabled then getGraphNumberOfPoint will be used
     * @return int|null
     */
    public function getGraphFixedOffset(): ?int
    {
        return $this->graphFixedOffset;
    }
}
