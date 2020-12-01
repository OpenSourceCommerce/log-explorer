<?php


namespace App\Entity;


class Dashboard
{
    private $table = 'nginx_access';

    private $columns = [
        [
            'name' => 'url',
            'title' => 'URL',
            'type' => 'text',
        ],
        [
            'name' => 'referer',
            'title' => 'Referer',
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
        [
            'name' => 'user_agent',
            'title' => 'User Agent',
            'type' => 'text',
            'visible' => false,
        ],
        [
            'name' => 'customer',
            'title' => 'Customer',
            'type' => 'text',
            'visible' => false,
        ],
        [
            'name' => 'body_bytes_sent',
            'title' => 'Size',
            'type' => 'text',
            'visible' => false,
        ],
    ];

    private $summaryColumns = [
        [
            'name' => 'status',
            'title' => 'Status',
        ],
    ];

    private $graphColumns = [
        [
            'name' => 'status',
            'title' => 'Total',
            'filter' => '',
            'color' => '#e77',
        ],
//        [
//            'name' => 'status',
//            'title' => 'OK',
//            'filter' => 'status < 300',
//            'color' => '#7F2',
//        ],
//        [
//            'name' => 'status',
//            'title' => 'NG',
//            'filter' => 'status >= 300',
//            'color' => '#444',
//        ]
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
