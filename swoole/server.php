<?php

require_once dirname(__FILE__) . "/vendor/autoload.php";

use App\Message\Process;
use Swoole\Server;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$_ENV['ROOT_DIR'] = dirname(__FILE__);

$host = $_ENV['SERVER_HOST'];
$udpPort = $_ENV['UDP_SERVER_PORT'] ?? null;
$tcpPort = $_ENV['TCP_SERVER_PORT'] ?? null;

if (empty($udpPort) && empty($tcpPort)) {
    throw new Exception('Please provide at least TCP or UDP port');
}

$server = new Server($host, null, SWOOLE_BASE);
$server->on(
    'receive',
    function (Server $server, int $fd, int $reactorId, string $data) {
        try {
            Process::process($data);
        } catch (\Exception $e) {
            echo $e->getMessage() . "\r\n" . $e->getTraceAsString();
        }

        $server->send($fd, "OK");
    }
);

if ($udpPort) {
    $server->listen($host, $udpPort, SWOOLE_SOCK_UDP);
    $server->on(
        'packet',
        function (Server $server, string $message, array $clientInfo) {
            try {
                Process::process($message);
            } catch (\Exception $e) {
                echo $e->getMessage() . "\r\n" . $e->getTraceAsString();
            }

            $server->sendto($clientInfo['address'], $clientInfo['port'], "OK");
        }
    );
}

if ($tcpPort) {
    $server->listen($host, $tcpPort, SWOOLE_SOCK_TCP);
}

$server->start();
