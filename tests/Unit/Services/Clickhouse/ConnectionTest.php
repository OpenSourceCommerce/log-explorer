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
        $ret = $conn->fetchAll('SELECT COUNT() FROM nginx_access');
        $this->assertIsArray($ret);
        $ret = reset($ret);
        var_dump($ret);
        $this->assertArrayHasKey('COUNT()', $ret);
    }

    public function testFetchColumn()
    {
        /** @var ConnectionInterface $conn */
        $conn = $this->getService(ConnectionInterface::class);
        $ret = $conn->fetchColumn('SELECT COUNT() FROM nginx_access');
        $this->assertIsArray($ret);
        var_dump($ret);
        $this->assertArrayHasKey('COUNT()', $ret);
    }

    public function testFetchOne()
    {
        /** @var ConnectionInterface $conn */
        $conn = $this->getService(ConnectionInterface::class);
        $ret = $conn->fetchOne('SELECT COUNT() FROM nginx_access');
        $this->assertIsNumeric($ret);
    }
}
