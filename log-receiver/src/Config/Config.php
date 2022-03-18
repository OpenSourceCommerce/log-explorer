<?php

namespace App\Config;

 use App\Exceptions\ConfigFileInvalid;
use App\Exceptions\ConfigFileNotFound;
use App\Logger\Logger;
use Symfony\Component\Yaml\Yaml;

class Config
{
    public static function read($filename, $key, $default = '')
    {
        $path = $_ENV['ROOT_DIR'] . "/config/{$filename}.y{ml,aml}";
        $files = glob($path, GLOB_BRACE);

        if (empty($files)) {
            throw new ConfigFileNotFound("Config file not found. Please create a config file \"{$filename}.yaml\" in \/config directory");
        }

        $configFile = array_shift($files);
        $config = Yaml::parseFile($configFile);

        if (empty($config)) {
            throw new ConfigFileInvalid("The file {$configFile} could not be read or the YAML is not valid");
        }

        if (!array_key_exists($key, $config)) {
            Logger::debug("Key \"{$key}\" does not exist in config file, return default value \"{$default}\"");

            return $default;
        }

        return $config[$key];
    }
}
