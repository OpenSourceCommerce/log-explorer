<?php


namespace App\EventSubscriber;

use App\Events\UnactivatedUserEvent;
use App\Services\User\UserServiceInterface;
use App\Services\UserToken\UserTokenServiceInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UnactivatedUserSubscriber implements EventSubscriberInterface
{
    /** @var UserServiceInterface */
    private $userService;
    /** @var UserTokenServiceInterface */
    private $userTokenService;

    public function __construct(UserServiceInterface $userService, UserTokenServiceInterface $userTokenService)
    {
        $this->userService = $userService;
        $this->userTokenService = $userTokenService;
    }

    public function resendActivationEmail(UnactivatedUserEvent $event): void
    {
        $user = $event->getUser();
        $token = $this->userTokenService->createToken($user);
        $this->userService->sendInvitationEmail($token);
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            UnactivatedUserEvent::UNACTIVATED_USER_LOGIN => ['resendActivationEmail', 100],
            UnactivatedUserEvent::UNACTIVATED_USER_FORGOT => ['resendActivationEmail', 100],
        ];
    }
}
