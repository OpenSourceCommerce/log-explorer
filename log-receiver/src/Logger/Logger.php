<?php

namespace App\Logger;

class Logger
{

    public static function log(int $level, string $message)
    {
        if ($level < $_ENV['LOG_LEVEL']) {
            return;
        }

        swoole_error_log($level, $message);
    }

    public static function debug(string $message)
    {
        self::log(SWOOLE_LOG_DEBUG, $message);
    }

    public static function info(string $message)
    {
        self::log(SWOOLE_LOG_INFO, $message);
    }

    public static function error(string $message)
    {
        self::log(SWOOLE_LOG_ERROR, $message);
    }

    public static function warning(string $message)
    {
        self::log(SWOOLE_LOG_WARNING, $message);
    }

    public static function notice(string $message)
    {
        self::log(SWOOLE_LOG_NOTICE, $message);
    }
}
