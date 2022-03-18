<?php

namespace App\Exceptions;

class ConfigFileInvalid extends \Exception
{
    protected $message = 'The file could not be read or the YAML is not valid';
}
