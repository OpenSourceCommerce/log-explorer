<?php


namespace App\Services\User;


use App\Entity\User;
use App\Entity\UserToken;
use DateTimeInterface;

interface UserTokenServiceInterface
{
    /**
     * Create token to user
     *
     * @param User $user
     * @return UserToken
     */
    public function create(User $user): UserToken;

    /**
     * Find UserToken by token
     * @param string $token
     * @return null|UserToken
     */
    public function findByToken(string $token): ?UserToken;

    /**
     * @param DateTimeInterface $date
     * @param $tokenExpiration
     * @return bool
     */
    public function isValidateDate(DateTimeInterface $date, $tokenExpiration): bool;
}
