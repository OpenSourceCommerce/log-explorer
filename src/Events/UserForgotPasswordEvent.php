<?php


namespace App\Events;


use App\Entity\UserToken;
use Symfony\Contracts\EventDispatcher\Event;

class UserForgotPasswordEvent extends Event
{
    public const NAME = 'user.forgot';

    /**
     * @var UserToken
     */
    protected $token;

    /**
     * UserForgotPasswordEvent constructor.
     * @param UserToken $token
     */
    public function __construct(UserToken $token)
    {
        $this->token = $token;
    }

    public function getToken()
    {
        return $this->token;
    }
}