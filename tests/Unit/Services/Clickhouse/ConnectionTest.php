<?php


namespace App\Tests\Unit\Services\Clickhouse;


use App\Services\Clickhouse\ConnectionInterface;
use App\Tests\WebTestCase;

class ConnectionTest extends WebTestCase
{
    public function testFetchAll()
    {
        /** @var ConnectionInterface $conn */
        $conn = $this->getService(ConnectionInterface::class);
        $ret = $conn->fetchAll('SELECT COUNT() as c FROM nginx_access');
        $this->assertIsArray($ret);
        $ret = reset($ret);
        $this->assertArrayHasKey('c', $ret);
    }

    public function testFetchColumn()
    {
        /** @var ConnectionInterface $conn */
        $conn = $this->getService(ConnectionInterface::class);
        $ret = $conn->fetchColumn('SELECT COUNT() as c FROM nginx_access');
        $this->assertIsArray($ret);
        $this->assertArrayHasKey('c', $ret);
    }

    public function testFetchOne()
    {
        /** @var ConnectionInterface $conn */
        $conn = $this->getService(ConnectionInterface::class);
        $ret = $conn->fetchOne('SELECT COUNT() FROM nginx_access');
        $this->assertIsNumeric($ret);
    }
}
