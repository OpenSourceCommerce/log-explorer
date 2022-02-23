<?php

namespace App\Config;

use Symfony\Component\Yaml\Yaml;

class Config
{
    public static function read($filename, $key, $default = '')
    {
        $path = $_ENV['ROOT_DIR'] . "/config/{$filename}.yml";

        if (!file_exists($path)) {
            throw new \Exception("{$path} not found");
        }

        $config = Yaml::parseFile($path);

        if (!array_key_exists($key, $config)) {
            return $default;
        }

        return $config[$key];
    }
}
