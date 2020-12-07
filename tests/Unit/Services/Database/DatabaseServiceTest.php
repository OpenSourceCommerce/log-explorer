<?php


namespace App\Tests\Unit\Services\Database;


use App\Services\Database\DatabaseService;
use App\Services\Database\DatabaseServiceInterface;
use App\Tests\WebTestCase;

class DatabaseServiceTest extends WebTestCase
{
    public function analysisProvider(): array
    {
        return [
            [
                'CREATE TABLE nginx_access (
    `ip` String,
    `customer` String,
    `timestamp` DateTime comment \'Time\',
    `url` String,
    `status` UInt16,
    `body_bytes_sent` UInt64 comment \'Size\',
    `referer` String,
    `user_agent` String comment \'Agent\'
)
ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp))
ORDER BY timestamp
SETTINGS index_granularity = 8192',
                [
                    'nginx_access',
                    [
                        [
                            'name' => 'ip',
                            'type' => 'String',
                            'title' => 'Ip'
                        ],
                        [
                            'name' => 'customer',
                            'type' => 'String',
                            'title' => 'Customer'
                        ],
                        [
                            'name' => 'timestamp',
                            'type' => 'DateTime',
                            'title' => 'Time'
                        ],
                        [
                            'name' => 'url',
                            'type' => 'String',
                            'title' => 'Url'
                        ],
                        [
                            'name' => 'status',
                            'type' => 'UInt16',
                            'title' => 'Status'
                        ],
                        [
                            'name' => 'body_bytes_sent',
                            'type' => 'UInt64',
                            'title' => 'Size'
                        ],
                        [
                            'name' => 'referer',
                            'type' => 'String',
                            'title' => 'Referer'
                        ],
                        [
                            'name' => 'user_agent',
                            'type' => 'String',
                            'title' => 'Agent'
                        ]
                    ],
                ]
            ],
            [
                'CREATE TABLE nginx_access(
    `ip` String,
    `customer` String,
    `timestamp` DateTime comment \'Time\',
    `url` String,
    `status` UInt16,
    `body_bytes_sent` UInt64 comment \'Size\',
    `referer` String,
    `user_agent` String comment \'Agent\')
ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp))
ORDER BY timestamp
SETTINGS index_granularity = 8192',
                [
                    'nginx_access',
                    [
                        [
                            'name' => 'ip',
                            'type' => 'String',
                            'title' => 'Ip'
                        ],
                        [
                            'name' => 'customer',
                            'type' => 'String',
                            'title' => 'Customer'
                        ],
                        [
                            'name' => 'timestamp',
                            'type' => 'DateTime',
                            'title' => 'Time'
                        ],
                        [
                            'name' => 'url',
                            'type' => 'String',
                            'title' => 'Url'
                        ],
                        [
                            'name' => 'status',
                            'type' => 'UInt16',
                            'title' => 'Status'
                        ],
                        [
                            'name' => 'body_bytes_sent',
                            'type' => 'UInt64',
                            'title' => 'Size'
                        ],
                        [
                            'name' => 'referer',
                            'type' => 'String',
                            'title' => 'Referer'
                        ],
                        [
                            'name' => 'user_agent',
                            'type' => 'String',
                            'title' => 'Agent'
                        ]
                    ],
                ]
            ],
            [
                'CREATE TABLE nginx_access (
    `ip` String,
    `customer` String,
    `timestamp` DateTime comment \'Time\',
    `url` String,
    `status` UInt16,
    `body_bytes_sent` UInt64 comment \'Size\',
    `referer` String,
    `user_agent` String
)
ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp))
ORDER BY timestamp
SETTINGS index_granularity = 8192',
                [
                    'nginx_access',
                    [
                        [
                            'name' => 'ip',
                            'type' => 'String',
                            'title' => 'Ip'
                        ],
                        [
                            'name' => 'customer',
                            'type' => 'String',
                            'title' => 'Customer'
                        ],
                        [
                            'name' => 'timestamp',
                            'type' => 'DateTime',
                            'title' => 'Time'
                        ],
                        [
                            'name' => 'url',
                            'type' => 'String',
                            'title' => 'Url'
                        ],
                        [
                            'name' => 'status',
                            'type' => 'UInt16',
                            'title' => 'Status'
                        ],
                        [
                            'name' => 'body_bytes_sent',
                            'type' => 'UInt64',
                            'title' => 'Size'
                        ],
                        [
                            'name' => 'referer',
                            'type' => 'String',
                            'title' => 'Referer'
                        ],
                        [
                            'name' => 'user_agent',
                            'type' => 'String',
                            'title' => 'User agent'
                        ]
                    ],
                ]
            ],
            [
                'CREATE TABLE IF NOT EXISTS logs.nginx_access ON CLUSTER cluster (
    `ip` String,
    `customer` String,
    `timestamp` DateTime comment \'Time\',
    `url` String,
    `status` UInt16,
    `body_bytes_sent` UInt64 comment \'Size\',
    `referer` String,
    `user_agent` String
)
ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp))
ORDER BY timestamp
SETTINGS index_granularity = 8192',
                [
                    'logs.nginx_access',
                    [
                        [
                            'name' => 'ip',
                            'type' => 'String',
                            'title' => 'Ip'
                        ],
                        [
                            'name' => 'customer',
                            'type' => 'String',
                            'title' => 'Customer'
                        ],
                        [
                            'name' => 'timestamp',
                            'type' => 'DateTime',
                            'title' => 'Time'
                        ],
                        [
                            'name' => 'url',
                            'type' => 'String',
                            'title' => 'Url'
                        ],
                        [
                            'name' => 'status',
                            'type' => 'UInt16',
                            'title' => 'Status'
                        ],
                        [
                            'name' => 'body_bytes_sent',
                            'type' => 'UInt64',
                            'title' => 'Size'
                        ],
                        [
                            'name' => 'referer',
                            'type' => 'String',
                            'title' => 'Referer'
                        ],
                        [
                            'name' => 'user_agent',
                            'type' => 'String',
                            'title' => 'User agent'
                        ]
                    ],
                ]
            ]
        ];
    }

    /**
     * @dataProvider analysisProvider
     * @param string $query
     * @param array $expected
     * @throws \ReflectionException
     */
    public function testAnalysisSql(string $query, array $expected)
    {
        /** @var DatabaseServiceInterface $service */
        $service = $this->getService(DatabaseServiceInterface::class);
        $method = self::getMethod(DatabaseService::class, 'analysis');
        list($table, $columns) = $method->invokeArgs($service, [$query]);
        list($eTable, $eColumns) = $expected;

        $this->assertEquals($eTable, $table);
        $this->assertEquals(json_encode($eColumns), json_encode($columns));
    }
}
