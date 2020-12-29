<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class ValidResetEmail extends Constraint
{
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public $exist = 'Your email does not exist.';
    public $inactive = 'Your account has been inactive.';
    public $confirm = 'Your account does not completed activation, please recheck your email to activate first.';
}
