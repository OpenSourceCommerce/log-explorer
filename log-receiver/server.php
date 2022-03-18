<?php

require_once dirname(__FILE__) . "/vendor/autoload.php";

use App\Enum\LogLevel;
use App\Logger\Logger;
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

/**
 * Config log level
 */
$logLevel = LogLevel::tryFrom($_ENV['LOG_LEVEL'] ?? 'error');

if ($logLevel === null) {
    $logLevel = LogLevel::from('error');
}

$_ENV['LOG_LEVEL'] = $logLevel->value();

/**
 * Create new server instance
 */
$server = new Server($host, null, SWOOLE_BASE);

/**
 * Server configuration
 */
$server->set([
    'log_level' => $_ENV['LOG_LEVEL']
]);

/**
 * TCP request handler
 */
$server->on(
    'receive',
    function (Server $server, int $fd, int $reactorId, string $data) {
        Logger::debug("[{$fd}] Received message {$data}");
        try {
            Process::process($data);
        } catch (\Exception $e) {
            Logger::error($e->getMessage() . "\r\n" . $e->getTraceAsString());
        }

        $server->send($fd, "OK");
    }
);

/**
 * Listening TCP request
 */
if ($tcpPort) {
    $server->listen($host, $tcpPort, SWOOLE_SOCK_TCP);

    Logger::info("TCP server listening on: \nHost {$host}\nPort {$tcpPort}");
}

/**
 * UDP request handler
 */
if ($udpPort) {
    $server->listen($host, $udpPort, SWOOLE_SOCK_UDP);
    $server->on(
        'packet',
        function (Server $server, string $message, array $clientInfo) {
            Logger::debug("Received message {$message} from " . $clientInfo['address']);

            try {
                Process::process($message);
            } catch (\Exception $e) {
                Logger::error($e->getMessage() . "\r\n" . $e->getTraceAsString());
            }

            $server->sendto($clientInfo['address'], $clientInfo['port'], "OK");
        }
    );

    Logger::info("UDP server listening on: \nHost {$host}\nPort {$udpPort}");
}

/**
 * Starting server
 */
$server->start();
