<?php


namespace App\Events;


use App\Entity\UserToken;
use Symfony\Contracts\EventDispatcher\Event;

class UserCreatedEvent extends Event
{
    public const USER_CREATED = 'user.created';

    /**
     * @var UserToken
     */
    protected $token;

    /**
     * UserRegistrationEvent constructor.
     * @param UserToken $token
     */
    public function __construct(UserToken $token)
    {
        $this->token = $token;
    }

    public function getUserToken(): UserToken
    {
        return $this->token;
    }
}
