<?php


namespace App\Services\UserToken;


use App\Entity\User;
use App\Entity\UserToken;

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
}
