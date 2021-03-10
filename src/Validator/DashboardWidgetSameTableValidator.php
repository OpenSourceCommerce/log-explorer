<?php

namespace App\Validator;

use App\Services\Clickhouse\ConnectionInterface;
use App\Services\Widget\WidgetServiceInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class DashboardWidgetSameTableValidator extends ConstraintValidator
{
    /**
     * @var WidgetServiceInterface
     */
    private $widgetService;

    /**
     * TableValidator constructor.
     * @param WidgetServiceInterface $widgetService
     */
    public function __construct(WidgetServiceInterface $widgetService)
    {
        $this->widgetService = $widgetService;
    }

    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint Table */

        if (!empty($value) || $this->widgetService->checkWidgetIdSameTable($value)) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->addViolation();
    }
}
