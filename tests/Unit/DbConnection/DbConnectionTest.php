<?php

namespace App\Tests\Unit\DbConnection;

use App\ClickHouse\Connection;
use App\Services\Clickhouse\ConnectionInterface;
use App\Tests\WebTestCase;

class DbConnectionTest extends webTestCase
{
    public function testConnection()
    {
        self::bootKernel();
        /** @var Connection $conn */
        $conn = $this->getService('doctrine.dbal.clickhouse_connection');
        $this->assertTrue($conn->getNativeConnection()->ping());
    }

    public function testConnectionService()
    {
        /** @var ConnectionInterface $conn */
        $conn = $this->getService(ConnectionInterface::class);
        $this->assertTrue($conn->ping());
    }
}
