<?php

namespace App\Message;

use App\Clickhouse\Pool;

class Process
{
    public static function process($message)
    {
        list($table, $data) = Parser::parse($message);

        $pool = Pool::getPool();
        $db = $pool->get();

        $values = array_values($data);
        $columns = array_keys($data);

        $db->insert($table,
            [
                $values,
            ],
            $columns
        );

        $pool->put($db);
    }
}
