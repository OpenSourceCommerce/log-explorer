<?php

declare(strict_types=1);

/*
 * This file is part of the FODDBALClickHouse package -- Doctrine DBAL library
 * for ClickHouse (a column-oriented DBMS for OLAP <https://clickhouse.yandex/>)
 *
 * (c) FriendsOfDoctrine <https://github.com/FriendsOfDoctrine/>.
 *
 * For the full copyright and license inflormation, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\ClickHouse;

use ClickHouseDB\Client;
use FOD\DBALClickHouse\ClickHouseConnection as FODClickHouseConnection;

/**
 * ClickHouse implementation for the Connection interface.
 */
class ClickHouseConnection extends FODClickHouseConnection
{
    /**
     * @return Client
     */
    public function getClickHouseClient(): Client
    {
        return $this->smi2CHClient;
    }
}
