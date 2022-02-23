<?php

namespace App\Message;

use App\Clickhouse\Pool;
use Symfony\Component\Uid\Uuid;

class Process
{
    public static function process($message)
    {
        list($table, $data) = Parser::parse($message);

        $pool = Pool::getPool();
        $db = $pool->get();

        if (!array_key_exists('_id', $data)) {
            $data['_id'] = (Uuid::v4())->toRfc4122();
        }

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
