<?php

namespace App\Exceptions;

class InvalidGrokMessage extends \Exception
{
    protected $message = 'The message is not a valid grok string';
}
