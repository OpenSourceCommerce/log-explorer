<?php

namespace App\Message;

use App\Config\Config;
use App\Exceptions\InvalidGrokMessage;
use App\Exceptions\InvalidJsonMessage;
use App\Grok\Grok;
use App\Logger\Logger;

class Parser
{
    const SYSLOG_CONFIG = 'syslog';

    /**
     * Parse the message received from udp request
     *
     * @param $message
     * @return array
     * @throws \Exception
     */
    public static function parse($message)
    {
        $grok = new Grok();
        /**
         * First we need to parse the syslog message
         * to get the table name and message content
         *
         * - Get syslog message pattern from config/syslog.yml
         * - Parse the message received from udp request
         */
        $syslogPattern = Config::read(self::SYSLOG_CONFIG, 'pattern');
        $syslogParsed = $grok->parse($syslogPattern, $message);

        Logger::debug("Syslog Message Parsed: " . json_encode($syslogParsed));

        /**
         * Then we will get the config of the table
         *
         * if table_name does not exist in syslog message,
         * use the app_name instead
         */
        $table = $syslogParsed['table_name'] ?? $syslogParsed['app_name'];
        $messageType = Config::read($table, 'type');
        $parsedMessage = '';

        /**
         * Parse the json message
         */
        if ($messageType == 'json') {
            $parsedMessage = json_decode($syslogParsed['message'], true);

            if ($parsedMessage === null) {
                throw new InvalidJsonMessage();
            }
        } /**
         * Parse the grok message
         */
        elseif ($messageType == 'grok') {
            $messagePattern = Config::read($table, 'pattern');
            $parsedMessage = $grok->parse($messagePattern, $syslogParsed['message']);

            if (empty($parsedMessage)) {
                throw new InvalidGrokMessage();
            }
        }

        if (empty($parsedMessage['timestamp'])) {
            Logger::debug("Syslog timestamp: {$syslogParsed['timestamp']}");

            try {
                $timestamp = \DateTime::createFromFormat('Y-m-d\TH:i:sP', $syslogParsed['timestamp']);

                if (empty($timestamp)) {
                    throw new \Exception('Invalid syslog timestamp format');
                }

                $timestamp = $timestamp->format('Y-m-d H:i:s');
            } catch (\Exception $e) {
                $timestamp = date('Y-m-d H:i:s');
            }

            $parsedMessage['timestamp'] = $timestamp;
        }

        /**
         * Return table name and parsed message
         */
        return [$table, $parsedMessage];
    }
}
