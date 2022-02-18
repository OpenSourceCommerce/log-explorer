<?php

namespace App\Clickhouse;

class Client
{
    public static function getConnection(): \ClickHouseDB\Client
    {
        $db = new \ClickHouseDB\Client([
            'host' => $_ENV['CLICKHOUSE_DB_HOST'],
            'port' => $_ENV['CLICKHOUSE_DB_PORT'],
            'username' => $_ENV['CLICKHOUSE_DB_USERNAME'],
            'password' => $_ENV['CLICKHOUSE_DB_PASSWORD']
        ]);
        $db->database($_ENV['CLICKHOUSE_DB_DBNAME']);
        $db->setTimeout($_ENV['CLICKHOUSE_DB_TIMEOUT']);
        $db->setConnectTimeOut($_ENV['CLICKHOUSE_DB_CONNECTION_TIMEOUT']);

        return $db;
    }
}
