<?php


namespace App\Security;


use App\Entity\User;
use App\Events\UnactivatedUserEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    private EventDispatcherInterface $dispatcher;

    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * @inheritDoc
     */
    public function checkPreAuth(UserInterface $user)
    {
    }

    /**
     * @inheritDoc
     */
    public function checkPostAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return;
        }

        if (!$user->getIsActive()) {
            throw new CustomUserMessageAuthenticationException('Your account was be disabled, please contact administrator for more detail.');
        }

        if (!$user->getIsConfirmed()) {
            $event = new UnactivatedUserEvent($user);
            $this->dispatcher->dispatch($event, UnactivatedUserEvent::UNACTIVATED_USER_LOGIN);
            throw new CustomUserMessageAuthenticationException('Your account does not completed activation, please recheck your email to activate first.');
        }
    }
}
