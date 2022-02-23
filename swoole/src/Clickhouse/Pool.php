<?php

namespace App\Clickhouse;

use Swoole\ConnectionPool;

class Pool
{
    public static function getPool(): ConnectionPool
    {
        return new ConnectionPool(function () {
            return Client::getConnection();
        }, $_ENV['CLICKHOUSE_DB_POOL_SIZE']);
    }
}
