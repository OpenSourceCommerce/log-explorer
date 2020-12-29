<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class PasswordValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        $uppercase = preg_match('@[A-Z]@', $value);
        $lowercase = preg_match('@[a-z]@', $value);
        $number = preg_match('@[0-9]@', $value);
        $specialCharacter = preg_match('@[^\w]@', $value);
        $minimumEightCharacters = (strlen($value) >= 8) ?? false;

        if ($uppercase && $lowercase && $number && $specialCharacter && $minimumEightCharacters) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->addViolation();
    }
}
