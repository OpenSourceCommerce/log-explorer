<?php


namespace App\Services\User;


use App\Entity\User;
use App\Entity\UserToken;
use DateTimeInterface;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;

class UserTokenService implements UserTokenServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var ContainerBagInterface */
    private $bag;

    /**
     * UpdateTaskResult constructor.
     *
     * @param EntityManagerInterface $em
     * @param ContainerBagInterface $bag
     */
    public function __construct(
        EntityManagerInterface $em,
        ContainerBagInterface $bag
    ) {
        $this->em = $em;
        $this->bag = $bag;
    }

    /**
     * Create token to user
     *
     * @param User $user
     * @return UserToken
     */
    public function create(User $user): UserToken
    {
        $token = new UserToken();
        $token->setToken($this->generateConfirmationToken($user->getEmail()));
        $token->setUser($user);
        return $token;
    }

    /**
     * @param $email
     * @return string
     */
    private function generateConfirmationToken($email): string
    {
        return hash_hmac('sha1', $email . '|' . time(), $this->bag->get('app.secret'));
    }

    /**
     * @return ObjectRepository
     */
    private function getRepository(): ObjectRepository
    {
        return $this->em->getRepository(UserToken::class);
    }

    /**
     * Find UserToken by token
     * @param string $token
     * @return UserToken|null
     */
    public function findByToken(string $token): ?UserToken
    {
        return $this->getRepository()->findByToken($token);
    }

    /**
     * @param DateTimeInterface $date
     * @param $tokenExpiration
     * @return bool
     */
    public function isValidateDate(DateTimeInterface $date, $tokenExpiration): bool
    {
        if (empty($expiration)) {
            // empty expiration mean no limited
            return true;
        }
        $validTo = strtotime($date->format('Y-m-d H:i:s') . ' ' . $expiration);
        return $validTo >= time();
    }
}
