<?php

namespace App\Message;

use App\Config\Config;
use App\Grok\Grok;

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

        /**
         * Then we will get the config of the table
         */
        $table = $syslogParsed['table_name'];
        $messageType = Config::read($table, 'type');
        $parsedMessage = '';

        /**
         * Parse the json message
         */
        if ($messageType == 'json') {
            $parsedMessage = json_decode($syslogParsed['message'], true);
        } /**
         * Parse the grok message
         */
        elseif ($messageType == 'grok') {
            $messagePattern = Config::read($table, 'pattern');
            $parsedMessage = $grok->parse($messagePattern, $syslogParsed['message']);
        }

        /**
         * Return table name and parsed message
         */
        return [$table, $parsedMessage];
    }
}
