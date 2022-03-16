<?php

namespace App\Enum;

enum LogLevel: string
{
    case DEBUG = 'debug';
    case ERROR = 'error';

    public function value(): int
    {
        return match ($this) {
            LogLevel::DEBUG => SWOOLE_LOG_DEBUG,
            LogLevel::ERROR => SWOOLE_LOG_ERROR,
        };
    }
}
