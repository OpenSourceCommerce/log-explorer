<?php


namespace App\Entity;


class Dashboard
{
    private $table = 'nginx_access';

    private $columns = ['host' => 'Host', 'device_type' => 'Device type', 'ip' => 'IP', 'timestamp' => 'Time', 'status' => 'Status code'];

    private $summaryColumns = ['status' => 'Status'];

    private $graphColumns = [
        [
            'column' => 'status',
            'label' => 'Status',
            'value' => '200',
            'color' => '#7F2',
        ]
    ];

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
     * @return string[]
     */
    public function getColumns(): array
    {
        return $this->columns;
    }

    /**
     * @return string[]
     */
    public function getSummaryColumns(): array
    {
        return $this->summaryColumns;
    }

    /**
     * @return string[]
     */
    public function getGraphColumns(): array
    {
        return $this->graphColumns;
    }
}