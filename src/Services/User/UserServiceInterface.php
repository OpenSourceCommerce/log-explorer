<?php

namespace App\Services\User;

use App\Entity\User;
use App\Entity\UserToken;

interface UserServiceInterface
{

    /**
     * @param array $options
     * @return User[]|array
     */
    public function getAllUser(array $options = []): array;

    /**
     * @param User $user
     * @return User
     */
    public function createUser(User $user): User;

    /**
     * @param User $user
     * @return bool
     */
    public function updateUser(User $user): bool;

    /**
     * @param UserToken $token
     */
    public function sendInvitationEmail(UserToken $token);

    /**
     * @param User $user
     * @param string $password
     */
    public function setConfirmation(User $user, string $password);

    /**
     * @param User $user
     * @param $isActive
     */
    public function setStatus(User $user, $isActive);

    /**
     * @param User $user
     */
    public function delete(User $user);
}
