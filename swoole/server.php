<?php

require_once dirname(__FILE__) . "/vendor/autoload.php";

use App\Message\Process;
use Swoole\Server;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$_ENV['ROOT_DIR'] = dirname(__FILE__);

$server = new Server($_ENV['UDP_SERVER_HOST'], $_ENV['UDP_SERVER_PORT'], SWOOLE_BASE, SWOOLE_SOCK_UDP);

$server->on(
    'packet',
    function (Server $server, string $message, array $clientInfo) {
        go(function () use ($message) {
            Process::process($message);
        });

        $server->sendto($clientInfo['address'], $clientInfo['port'], "OK");
    }
);

$server->start();
