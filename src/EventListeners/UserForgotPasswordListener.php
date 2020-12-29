<?php


namespace App\EventListeners;


use App\Events\UserForgotPasswordEvent;
use App\Services\User\UserServiceInterface;

/**
 * Class UserRegisteredListener
 * @package App\EventListeners
 */
class UserForgotPasswordListener
{
    /**
     * @var UserServiceInterface
     */
    private $userService;

    /**
     * UserRegisteredListener constructor.
     * @param UserServiceInterface $userService
     */
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param UserForgotPasswordEvent $event
     */
    public function onUserForgot(UserForgotPasswordEvent $event)
    {
        $this->userService->sendForgotPasswordEmail($event->getToken());
    }
}