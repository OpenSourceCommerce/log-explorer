<?php

namespace App\Message;

use App\Clickhouse\Pool;
use App\Logger\Logger;
use ClickHouseDB\Client as ClickhouseClient;
use Symfony\Component\Uid\Uuid;

class Process
{
    public static function process($message)
    {
        list($tableName, $data) = Parser::parse($message);

        Logger::debug("Parsed Message: " . json_encode($data));

        $pool = Pool::getPool();
        /** @var ClickhouseClient $db */
        $db = $pool->get();

        if (!array_key_exists('_id', $data)) {
            $data['_id'] = (Uuid::v4())->toRfc4122();
        }

        /**
         * Fetch existing columns in clickhouse db table
         */
        $table = $db->select("DESCRIBE {$tableName}");
        $existingColumns = array_column($table->rawData()['data'], 'name');
        Logger::debug("DESCRIBE TABLE \"{$tableName}\" in Clickhouse: " . json_encode($existingColumns));

        /**
         * Filtering data, remove data's column if not exist in $existingColumns
         */
        $data = array_filter($data, function ($value, $key) use ($existingColumns) {
            return in_array($key, $existingColumns);
        }, ARRAY_FILTER_USE_BOTH);

        $values = array_values($data);
        $columns = array_keys($data);

        Logger::debug("Filtered data: " . json_encode($data));

        $db->insert($tableName,
            [
                $values,
            ],
            $columns
        );

        $pool->put($db);
    }
}
