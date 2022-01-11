<?php

namespace App\Services\User;

use App\Entity\User;
use App\Entity\UserToken;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

interface UserServiceInterface
{

    /**
     * @param array $options
     * @return User[]|array
     */
    public function getAllUser(array $options = []): array;

    /**
     * @param User $user
     * @param string|null $password
     * @return User
     * @throws UniqueConstraintViolationException
     */
    public function createUser(User $user, ?string $password = null): User;

    /**
     * @param User $user
     * @return bool
     */
    public function updateUser(User $user): bool;

    /**
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User;

    /**
     * @param User $user
     */
    public function forgotPassword(User $user);

    /**
     * @param UserToken $token
     */
    public function sendForgotPasswordEmail(UserToken $token);

    /**
     * @param UserToken $token
     * @param string $password
     */
    public function resetPassword(UserToken $token, string $password);

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

    /**
     * Set password for user
     *
     * @param User $user
     * @param string $password
     */
    public function setUserPassword(User $user, string $password);

    /**
     * @param UserToken $token
     * @return mixed
     */
    public function sendInvitationEmail(UserToken $token);

    /**
     * @param $id
     * @return User|null
     */
    public function find($id): ?User;

    /**
     * @return User|null
     */
    public function findAdminUser(): ?User;
}
