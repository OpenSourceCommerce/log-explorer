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
                'nginx_access'
            ],
            [
                'CREATE TABLE IF NOT EXISTS nginx_access(
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
                'nginx_access'
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
                'logs.nginx_access'
            ],
            [
                'ALTER TABLE nginx_access ADD COLUMN host String COMMENT \'Host name\'',
                'nginx_access'
            ],
            [
                'ALTER TABLE nginx_access DROP COLUMN IF EXISTS host',
                'nginx_access'
            ]
        ];
    }

    /**
     * @dataProvider analysisProvider
     * @param string $query
     * @param string $expected
     * @throws \ReflectionException
     */
    public function testAnalysisSql(string $query, string $expected)
    {
        /** @var DatabaseServiceInterface $service */
        $service = $this->getService(DatabaseServiceInterface::class);
        $method = self::getMethod(DatabaseService::class, 'getTableFromQuery');
        $table = $method->invokeArgs($service, [$query]);

        $this->assertEquals($expected, $table);
    }
}
