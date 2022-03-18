<?php

namespace App\Exceptions;

class ConfigFileNotFound extends \Exception
{
    protected $message = 'The config file not found';
}
