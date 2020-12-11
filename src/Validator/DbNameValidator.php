<?php

namespace App\Validator;

use App\Services\Clickhouse\ConnectionInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class DbNameValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint DbName */

        if (preg_match('#^[a-zA-Z_][a-zA-Z0-9_]*$#', $value)) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ name }}', $value ?? '')
            ->addViolation();
    }
}
