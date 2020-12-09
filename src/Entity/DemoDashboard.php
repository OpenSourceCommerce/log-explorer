<?php


namespace App\Entity;


class DemoDashboard
{
    private $table = 'nginx_access';

    private $columns = [
        [
            'name' => 'url',
            'title' => 'URL',
        ],
        [
            'name' => 'referer',
            'title' => 'Referer',
        ],
        [
            'name' => 'ip',
            'title' => 'IP',
        ],
        [
            'name' => 'timestamp',
            'title' => 'Time',
        ],
        [
            'name' => 'status',
            'title' => 'Status',
        ],
        [
            'name' => 'user_agent',
            'title' => 'User Agent',
        ],
        [
            'name' => 'customer',
            'title' => 'Customer',
        ],
        [
            'name' => 'body_bytes_sent',
            'title' => 'Size',
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
     * @return Table
     */
    public function getTable(): Table
    {
        $table = new Table();
        $table->setName($this->table);
        return $table;
    }

    /**
     * @return Column[]|array
     */
    public function getColumns(): array
    {
        $columns = [];
        foreach ($this->columns as $column) {
            $c = new Column();
            $c->setName($column['name']);
            $c->setTitle($column['title']);
            $columns[] = $c;
        }
        return $columns;
    }

    /**
     * @return Column[]|array
     */
    public function getSummaryColumns(): array
    {
        $columns = [];
        foreach ($this->summaryColumns as $column) {
            $c = new Column();
            $c->setName($column['name']);
            $c->setTitle($column['title']);
            $columns[] = $c;
        }
        return $columns;
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
