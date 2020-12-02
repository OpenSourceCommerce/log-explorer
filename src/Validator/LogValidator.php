<?php

namespace App\Validator;

use App\Services\Clickhouse\ConnectionInterface;
use App\Services\Log\LogServiceInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class LogValidator extends ConstraintValidator
{
    /**
     * @var LogServiceInterface
     */
    private $logService;
    /**
     * @var ConnectionInterface
     */
    private $connection;

    /**
     * LogValidator constructor.
     * @param LogServiceInterface $logService
     * @param ConnectionInterface $connection
     */
    public function __construct(LogServiceInterface $logService, ConnectionInterface $connection)
    {

        $this->logService = $logService;
        $this->connection = $connection;
    }

    public function validate($value, Constraint $constraint)
    {
        /* @var $constraint Log */

        if (empty($value)) {
            return;
        }

        if (!is_array($value)) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', json_encode($value))
                ->addViolation();

            return;
        }

        $table = $this->context->getObject()->getParent()->get('table')->getData();

        if (empty($table) || !$this->connection->tableExists($table)) {
            return;
        }

        $columnsName = $this->logService->getColumnsName($table);
        $neededColumns = array_keys($value);

        $unexpectedColumns = array_diff($neededColumns, $columnsName);

        if (!empty($unexpectedColumns)) {
            $this->context->buildViolation($constraint->unexpectedColumnsMessage)
                ->setParameter('{{ value }}', json_encode(array_values($unexpectedColumns)))
                ->addViolation();

            return;
        }

        //TODO: Validate column type, check not null column
//        $columns = $this->nginxAccessService->getColumns();

//        /** @var Column $column */
        /*foreach ($columns as $column) {
            //Check not null column
            if ($column->getNotnull() && empty($value[$column->getName()])) {
                $this->context->buildViolation($constraint->isRequiredMessage)
                    ->setParameter('{{ column }}', $column->getName())
                    ->addViolation();
            }
        }*/
    }
}
