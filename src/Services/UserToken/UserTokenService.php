<?php


namespace App\Services\UserToken;


use App\Entity\User;
use App\Entity\UserToken;
use App\Repository\UserTokenRepository;
use DateTimeInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class UserTokenService implements UserTokenServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var ParameterBagInterface */
    private $parameterBag;

    public function __construct(EntityManagerInterface $em, ParameterBagInterface $parameterBag)
    {
        $this->em = $em;
        $this->parameterBag = $parameterBag;
    }

    /**
     * @return UserTokenRepository
     */
    private function getRepository(): UserTokenRepository
    {
        return $this->em->getRepository(UserToken::class);
    }

    /**
     * @inheritDoc
     */
    public function createToken(User $user, bool $flush = true): UserToken
    {
        $token = new UserToken();
        $token->setUser($user);
        $token->setToken($this->generateToken($user));

        $this->em->persist($token);
        if ($flush) {
            $this->em->flush();
        }

        return $token;
    }

    private function generateToken(User $user): string
    {
        return hash_hmac('sha1', $user->getEmail() . '|' . $user->getFirstName() . '|' . $user->getLastName(), $this->parameterBag->get('app.secret'));
    }

    /**
     * @inheritDoc
     */
    public function delete(UserToken $token, bool $flush = true)
    {
        $token->setDeletedAt();
        $this->em->persist($token);
        if ($flush) {
            $this->em->flush();
        }
    }

    /**
     * @inheritDoc
     */
    public function deleteOfUser(User $user)
    {
        return $this->getRepository()->deleteOfUser($user);
    }

    /**
     * @inheritDoc
     */
    public function findByToken(string $token): ?UserToken
    {
        return $this->getRepository()->findByToken($token);
    }

    /**
     * @inheritDoc
     */
    public function isValidateDate(DateTimeInterface $date, $tokenExpiration): bool
    {
        if (empty($expiration)) {
            // empty expiration mean no limited
            return true;
        }
        $validTo = strtotime($date->format('Y-m-d H:i:s').' '.$expiration);
        return $validTo >= time();
    }
}
