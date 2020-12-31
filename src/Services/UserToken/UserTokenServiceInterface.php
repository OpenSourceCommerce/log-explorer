<?php


namespace App\Services\UserToken;


use App\Entity\User;
use App\Entity\UserToken;
use DateTimeInterface;

interface UserTokenServiceInterface
{
    /**
     * @param User $user
     * @param bool $flush
     * @return UserToken
     */
    public function createToken(User $user, bool $flush = true): UserToken;

    /**
     * @param UserToken $token
     * @param bool $flush
     */
    public function delete(UserToken $token, bool $flush = true);

    /**
     * @param User $user
     * @param bool $flush
     * @return mixed
     */
    public function deleteOfUser(User $user, bool $flush = true);

    /**
     * @param UserToken $userToken
     * @return bool
     */
    public function isInvalid(UserToken $userToken): bool;

    /**
     * Find UserToken by token
     * @param string $token
     * @return UserToken|null
     */
    public function findByToken(string $token): ?UserToken;
}
