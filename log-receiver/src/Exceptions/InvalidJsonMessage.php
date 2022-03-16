<?php

namespace App\Exceptions;

class InvalidJsonMessage extends \Exception
{
    protected $message = 'The message is not a valid json string';
}
