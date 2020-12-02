<?php

namespace App\Validator;

use App\Services\Clickhouse\ConnectionInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class TableValidator extends ConstraintValidator
{
    /**
     * @var ConnectionInterface
     */
    private $connection;

    /**
     * TableValidator constructor.
     * @param ConnectionInterface $connection
     */
    public function __construct(ConnectionInterface $connection)
    {
        $this->connection = $connection;
    }

    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint Table */

        if (!empty($value) && $this->connection->tableExists($value)) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ table }}', $value)
            ->addViolation();
    }
}
