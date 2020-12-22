<?php


namespace App\Services\User;


use App\Entity\User;
use App\Entity\UserToken;
use App\Events\UserActivatedEvent;
use App\Events\UserForgotPasswordEvent;
use App\Events\UserCreatedEvent;
use App\Exceptions\UserNotFoundException;
use App\Repository\UserRepository;
use App\Services\Mailer\MailerServiceInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserService implements UserServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;
    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;
    /**
     * @var UserTokenServiceInterface
     */
    private $userTokenService;
    /**
     * @var MailerServiceInterface
     */
    private $mailerService;
    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;
    /**
     * @var ContainerBagInterface
     */
    private $containerBag;

    /**
     * UserService constructor.
     *
     * @param EntityManagerInterface $em
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param EventDispatcherInterface $dispatcher
     * @param UrlGeneratorInterface $urlGenerator
     * @param UserTokenServiceInterface $userTokenService
     * @param MailerServiceInterface $mailerService
     * @param ContainerBagInterface $containerBag
     */
    public function __construct(
        EntityManagerInterface $em,
        UserPasswordEncoderInterface $passwordEncoder,
        EventDispatcherInterface $dispatcher,
        UrlGeneratorInterface $urlGenerator,
        UserTokenServiceInterface $userTokenService,
        MailerServiceInterface $mailerService,
        ContainerBagInterface $containerBag
    ) {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
        $this->dispatcher = $dispatcher;
        $this->userTokenService = $userTokenService;
        $this->mailerService = $mailerService;
        $this->urlGenerator = $urlGenerator;
        $this->containerBag = $containerBag;
    }

    /**
     * Create token for user
     *
     * @param $user
     * @return UserToken
     */
    private function createUserToken($user): UserToken
    {
        $token = $this->userTokenService->create($user);
        $user->addUserToken($token);
        $this->em->persist($token);
        return $token;
    }

    /**
     * @inheritDoc
     */
    public function create(User $user, $password = null): User
    {
        $token = null;
        if (!empty($password)) {
            // encode the plain password
            $this->setUserPassword($user, $password);
            $user->setIsConfirmed(true);
        } else {
            $token = $this->createUserToken($user);
            $user->setIsConfirmed(false);
        }
        $user->setIsActive(true);
        $this->save($user);

        if (!empty($token)) {
            $event = new UserCreatedEvent($token);
            $this->dispatcher->dispatch($event, UserCreatedEvent::USER_CREATED);
        }

        return $user;
    }

    /**
     * Set password for user
     *
     * @param User $user
     * @param string $password
     */
    public function setUserPassword(User $user, string $password)
    {
        $user->setPassword(
            $this->passwordEncoder->encodePassword(
                $user,
                $password
            )
        );
    }

    private function save(User $user)
    {
        $this->em->persist($user);
        $this->em->flush();
    }

    /**
     * Send confirmation email to user
     * @param UserToken $token
     */
    public function sendActivationEmail(UserToken $token)
    {
        $user = $token->getUser();
        $activeUrl = $this->urlGenerator->generate('activation', ['token' => $token->getToken()],
            UrlGeneratorInterface::ABSOLUTE_URL);
        $data = [
            'firstName' => $user->getFirstname(),
            'activeUrl' => $activeUrl,
        ];
        $this->mailerService->sendActivationToUser($user->getEmail(), $data);
    }

    /**
     * @param UserToken $token
     * @return User
     */
    public function setUserConfirmed(UserToken $token): User
    {
        $user = $token->getUser();
        if (!$user->getIsConfirmed()) {
            $user->setIsConfirmed(true);
        }
        $user->removeUserToken($token);
        $this->em->remove($token);
        $this->save($user);
        return $user;
    }

    /** @return UserRepository */
    private function getRepository(): UserRepository
    {
        return $this->em->getRepository(User::class);
    }

    /**
     * @param string $email
     * @return User
     */
    public function findByEmail(string $email): User
    {
        return $this->getRepository()->findOneBy(['email' => $email]);
    }

    /**
     * @param int $id
     * @return User
     * @throws UserNotFoundException
     */
    public function findById(int $id): User
    {
        $user = $this->getRepository()->find($id);
        if (empty($user) || $user->getDeletedAt()) {
            throw new UserNotFoundException();
        }
        return $user;
    }

    /**
     * @param User $user
     */
    public function forgotPassword(User $user)
    {
        $token = $this->userTokenService->create($user);
        $user->addUserToken($token);
        $this->em->persist($token);
        $this->save($user);

        $event = new UserForgotPasswordEvent($token);
        $this->dispatcher->dispatch($event, UserForgotPasswordEvent::NAME);
    }

    /**
     * @param UserToken $token
     */
    public function sendForgotPasswordEmail(UserToken $token)
    {
        $user = $token->getUser();
        $resetUrl = $this->urlGenerator->generate('reset_password', ['token' => $token->getToken()],
            UrlGeneratorInterface::ABSOLUTE_URL);
        $data = [
            'firstName' => $user->getFirstname(),
            'resetUrl' => $resetUrl,
        ];
        $this->mailerService->sendResetPasswordEmail($user->getEmail(), $data);
    }

    /**
     * @param UserToken $token
     * @param string $password
     */
    public function resetPassword(UserToken $token, string $password)
    {
        $user = $token->getUser();
        $this->setUserPassword($user, $password);
        $user->removeUserToken($token);
        $this->em->remove($token);
        $this->save($user);
    }

    /**
     * @param User $user
     * @param string|null $password
     */
    public function updateProfile(User $user, ?string $password = null)
    {
        if ($password) {
            $this->setUserPassword($user, $password);
        }
        $this->save($user);
    }

    /**
     * @param User $user
     * @param string $password
     */
    public function setPassword(User $user, string $password)
    {
        $this->setUserPassword($user, $password);
        $this->save($user);
    }

    /**
     * Get user roles
     * @return array
     */
    public function getUserRoles(): array
    {
        return $this->containerBag->get('app.user.roles');
    }

    /**
     * @param UserToken $userToken
     * @param User $user
     * @param string $password
     */
    public function activate(UserToken $userToken, User $user, string $password)
    {
        $this->setUserPassword($user, $password);
        $user->setIsActive(true);
        $user->setIsConfirmed(true);
        $user->removeUserToken($userToken);
        $this->em->remove($userToken);
        $this->save($user);

        $event = new UserActivatedEvent($user);
        $this->dispatcher->dispatch($event, UserActivatedEvent::USER_ACTIVATED);
    }

    /**
     * @inheritDoc
     */
    public function setUserStatus(User $user, int $status)
    {
        $user->setIsActive(!empty($status));
        $this->save($user);
    }

    /**
     * @inheritDoc
     */
    public function delete(User $user)
    {
        // Unset user's tokens
        $userTokens = $user->getUserTokens();

        foreach ($userTokens as $userToken) {
            $this->em->remove($userToken);
        }

        $this->em->remove($user);
        $this->em->flush();
    }
}
