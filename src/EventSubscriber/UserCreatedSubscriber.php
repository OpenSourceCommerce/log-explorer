<?php


namespace App\EventSubscriber;

use App\Events\UserCreatedEvent;
use App\Services\User\UserServiceInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserCreatedSubscriber implements EventSubscriberInterface
{
    /** @var UserServiceInterface */
    private $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function onUserCreated(UserCreatedEvent $event): void
    {
        $this->userService->sendInvitationEmail($event->getUserToken());
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            UserCreatedEvent::USER_CREATED => ['onUserCreated', 100],
        ];
    }
}
