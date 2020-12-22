<?php


namespace App\Services\User;


use App\Entity\User;
use App\Entity\UserToken;
use App\Exceptions\UserNotFoundException;

interface UserServiceInterface
{
    /**
     * Create new user with password
     * @param User $user
     * @param string|null $password
     * @return User
     */
    public function create(User $user, $password = null): User;

    /**
     * Send confirmation email to user
     * @param UserToken $token
     */
    public function sendActivationEmail(UserToken $token);

    /**
     * @param UserToken $token
     * @return User
     */
    public function setUserConfirmed(UserToken $token): User;

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
     * @param string|null $password
     */
    public function updateProfile(User $user, ?string $password = null);

    /**
     * @param User $user
     * @param string $password
     */
    public function setPassword(User $user, string $password);

    /**
     * Get user roles
     * @return array
     */
    public function getUserRoles(): array;

    /**
     * @param UserToken $userToken
     * @param User $user
     * @param string $password
     */
    public function activate(UserToken $userToken, User $user, string $password);

    /**
     * @param int $id
     * @return User
     * @throws UserNotFoundException
     */
    public function findById(int $id): User;

    /**
     * @param User $user
     * @param int $status
     */
    public function setUserStatus(User $user, int $status);

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
}
