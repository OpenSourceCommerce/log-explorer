<?php

namespace App\Validator;

use App\Events\UnactivatedUserEvent;
use App\Services\User\UserServiceInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class ValidResetEmailValidator extends ConstraintValidator
{
    /**
     * @var UserServiceInterface
     */
    private $userService;
    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;

    /**
     * UnconfirmedEmailValidator constructor.
     * @param UserServiceInterface $userService
     * @param EventDispatcherInterface $dispatcher
     */
    public function __construct(UserServiceInterface $userService, EventDispatcherInterface $dispatcher)
    {
        $this->userService = $userService;
        $this->dispatcher = $dispatcher;
    }

    public function validate($value, Constraint $constraint)
    {
        if (null === $value || '' === $value) {
            return;
        }

        $user = $this->userService->findByEmail($value);

        if (!$user) {
            $this->context->buildViolation($constraint->exist)
                ->addViolation();
            return;
        }

        if (!$user->getIsConfirmed()) {
            $event = new UnactivatedUserEvent($user);
            $this->dispatcher->dispatch($event, UnactivatedUserEvent::UNACTIVATED_USER_FORGOT);
            $this->context->buildViolation($constraint->confirm)
                ->addViolation();
        }

        if (!$user->getIsActive()) {
            $this->context->buildViolation($constraint->inactive)
                ->addViolation();
        }
    }
}
