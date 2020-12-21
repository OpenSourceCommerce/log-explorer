<?php


namespace App\Services\User;


use App\Entity\User;
use App\Entity\UserToken;
use App\Events\UserCreatedEvent;
use App\Repository\UserRepository;
use App\Services\Mailer\MailerServiceInterface;
use App\Services\UserToken\UserTokenServiceInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

class UserService implements UserServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var UserTokenServiceInterface */
    private $userTokenService;
    /** @var EventDispatcherInterface */
    private $dispatcher;
    /** @var UrlGeneratorInterface */
    private $urlGenerator;
    /** @var MailerServiceInterface */
    private $mailerService;
    /** @var UserPasswordEncoderInterface */
    private $passwordEncoder;

    public function __construct(
        EntityManagerInterface $em,
        UserTokenServiceInterface $userTokenService,
        UserPasswordEncoderInterface $passwordEncoder,
        EventDispatcherInterface $dispatcher,
        UrlGeneratorInterface $urlGenerator,
        MailerServiceInterface $mailerService
    ) {
        $this->em = $em;
        $this->userTokenService = $userTokenService;
        $this->passwordEncoder = $passwordEncoder;
        $this->dispatcher = $dispatcher;
        $this->urlGenerator = $urlGenerator;
        $this->mailerService = $mailerService;
    }

    /**
     * @return UserRepository
     */
    private function getRepository(): UserRepository
    {
        return $this->em->getRepository(User::class);
    }

    /**
     * @inheritDoc
     */
    public function getAllUser(array $options = []): array
    {
        return $this->getRepository()->getAllUser($options);
    }

    private function save(User $user): bool
    {
        $this->em->persist($user);
        $this->em->flush();

        return true;
    }

    /**
     * @inheritDoc
     */
    public function createUser(User $user): User
    {
        $user->setIsActive(true);
        $user->setIsConfirmed(false);

        $token = $this->userTokenService->createToken($user, false);

        $this->save($user);

        $event = new UserCreatedEvent($token);
        $this->dispatcher->dispatch($event, UserCreatedEvent::USER_CREATED);

        return $user;
    }

    /**
     * @inheritDoc
     */
    public function updateUser(User $user): bool
    {
        return $this->save($user);
    }

    /**
     * @inheritDoc
     */
    public function sendInvitationEmail(UserToken $token)
    {
        $activeUrl = $this->urlGenerator->generate('user_confirmation', ['token' => $token->getToken()],
                UrlGeneratorInterface::ABSOLUTE_URL);

        $data = [
            'username' => $token->getUser()->getFirstname().' '.$token->getUser()->getLastName(),
            'url' => $activeUrl,
        ];
        return $this->mailerService->sendEmailConfirmation($token->getUser()->getEmail(), $data);
    }

    /**
     * @inheritDoc
     */
    public function setConfirmation(User $user, string $password)
    {
        $this->setUserPassword($user, $password);
        $user->setIsConfirmed(true);
        $this->save($user);
    }

    private function setUserPassword(User $user, string $password)
    {
        $user->setPassword(
            $this->passwordEncoder->encodePassword(
                $user,
                $password
            )
        );
    }
}
