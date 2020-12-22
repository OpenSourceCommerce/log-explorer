<?php


namespace App\Events;

use App\Entity\Project;
use App\Entity\UserToken;
use Symfony\Contracts\EventDispatcher\Event;

class UserCreatedEvent extends Event
{
    public const USER_CREATED = 'user.created';
    public const USER_INVITED = 'user.invited';

    /**
     * @var UserToken
     */
    protected $token;
    /**
     * @var Project
     */
    protected $project;

    /**
     * UserCreatedEvent constructor.
     * @param UserToken $token
     * @param Project|null $project
     */
    public function __construct(UserToken $token, ?Project $project = null)
    {
        $this->token = $token;
        $this->project = $project;
    }

    /**
     * @return UserToken
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @return Project|null
     */
    public function getProject()
    {
        return $this->project;
    }
}