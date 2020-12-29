<?php


namespace App\Events;

use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class UnactivatedUserEvent extends Event
{
    public const UNACTIVATED_USER_LOGIN = 'unactivated.user.login';
    public const UNACTIVATED_USER_FORGOT = 'unactivated.user.forgot';

    /**
     * @var User
     */
    protected $user;

    /**
     * UserCreatedEvent constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }
}
