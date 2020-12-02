<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class Log extends Constraint
{
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $message = 'The value "{{ value }}" is not valid.';
    public $invalidColumnType = 'The value "{{ value }}" does not match with column type {{ column }}.';
    public $unexpectedColumnsMessage = 'These columns {{ value }} are unexpected!';
    public $isRequiredMessage = 'This column "{{ column }}" could not be null!';
    public $invalidTableName = 'The table field is not valid!';
}
