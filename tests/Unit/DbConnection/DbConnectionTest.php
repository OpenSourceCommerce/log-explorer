<?php

namespace App\Tests\Unit\DbConnection;

use App\Services\Clickhouse\ConnectionInterface;
use App\Tests\WebTestCase;

class DbConnectionTest extends webTestCase
{
    public function testConnection()
    {
        self::bootKernel();
        $conn = $this->getService('doctrine.dbal.clickhouse_connection');
        $this->assertTrue($conn->ping());
    }

    public function testConnectionService()
    {
        /** @var ConnectionInterface $conn */
        $conn = $this->getService(ConnectionInterface::class);
        $this->assertTrue($conn->ping());
    }
}