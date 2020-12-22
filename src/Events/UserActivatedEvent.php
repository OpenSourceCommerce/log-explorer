<?php


namespace App\Events;

use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class UserActivatedEvent extends Event
{
    public const USER_ACTIVATED = 'user.activated';

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
    public function getUser()
    {
        return $this->user;
    }
}