<?php


namespace App\Events;

use App\Entity\UserToken;
use Symfony\Contracts\EventDispatcher\Event;

class UnactivatedUserEvent extends Event
{
    public const UNACTIVATED_USER_LOGIN = 'unactivated.user.login';
    public const UNACTIVATED_USER_FORGOT = 'unactivated.user.forgot';

    /**
     * @var UserToken
     */
    protected $token;

    /**
     * UserCreatedEvent constructor.
     * @param UserToken $token
     */
    public function __construct(UserToken $token)
    {
        $this->token = $token;
    }

    /**
     * @return UserToken
     */
    public function getToken()
    {
        return $this->token;
    }
}