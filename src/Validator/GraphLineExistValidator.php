<?php

namespace App\Validator;

use App\Services\GraphLine\GraphLineServiceInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class GraphLineExistValidator extends ConstraintValidator
{
    /**
     * @var GraphLineServiceInterface
     */
    private $graphLineService;

    /**
     * TableValidator constructor.
     * @param GraphLineServiceInterface $graphLineService
     */
    public function __construct(GraphLineServiceInterface $graphLineService)
    {
        $this->graphLineService = $graphLineService;
    }

    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint GraphLineExist */

        if (empty($value)) {
            return;
        }
        $line = $this->graphLineService->findById($value);
        if (!empty($line)) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ id }}', $value)
            ->addViolation();
    }
}
