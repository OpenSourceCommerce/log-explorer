<?php

namespace App\Security;

use App\Entity\User;
use App\Events\UnactivatedUserEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Exception\InvalidCsrfTokenException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\PassportInterface;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class LoginFormAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_login';

    private $entityManager;
    private $router;
    private $csrfTokenManager;
    private $passwordEncoder;
    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;

    public function __construct(
        EntityManagerInterface $entityManager,
        RouterInterface $router,
        CsrfTokenManagerInterface $csrfTokenManager,
        UserPasswordHasherInterface $passwordEncoder,
        EventDispatcherInterface $dispatcher
    )
    {
        $this->entityManager = $entityManager;
        $this->router = $router;
        $this->csrfTokenManager = $csrfTokenManager;
        $this->passwordEncoder = $passwordEncoder;
        $this->dispatcher = $dispatcher;
    }

    public function authenticate(Request $request): PassportInterface
    {
        $request->request->replace(json_decode($request->getContent(), true));
        $email = $request->request->get('email', '');

        $request->getSession()->set(Security::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($request->request->get('password', '')),
            [
                new CsrfTokenBadge('authenticate', $request->get('_token')),
            ]
        );
    }

    private function shouldRedirectTo($url): bool
    {
        // set context with GET method of the previous ajax call
        $context = $this->router->getContext();
        $currentMethod = $context->getMethod();
        $context->setMethod('GET');
        $uri = parse_url($url)['path'];
        if (substr($uri, 5) === '/api/') {
            return false;
        }
        $routeName = $this->router->match($uri)['_route'];
        // set back original http method
        $context->setMethod($currentMethod);
        return !in_array($routeName, [
            'activation',
            'login',
            'forgot_password',
            'reset_password',
            'translation'
        ]);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        /** @var User $user */
        $user = $token->getUser();
        if (!$user->getIsConfirmed()) {
            $event = new UnactivatedUserEvent($user);
            $this->dispatcher->dispatch($event, UnactivatedUserEvent::UNACTIVATED_USER_LOGIN);
            throw new CustomUserMessageAuthenticationException('Your account does not completed activation, please recheck your email to activate first.');
        }

        if (!$user->getIsActive()) {
            throw new CustomUserMessageAuthenticationException('Your account was be disabled, please contact administrator for more detail.');
        }

        $targetPath = $this->getTargetPath($request->getSession(), $firewallName);
        if ($targetPath && $this->shouldRedirectTo($targetPath)) {
            return new JsonResponse(['error' => 0, 'redirect' => $targetPath]);
        }

        return new JsonResponse(['error' => 0]);
    }

    /**
     * Override to change what happens after a bad username/password is submitted.
     *
     * @param Request $request
     * @param AuthenticationException $exception
     * @return Response
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        if ($request->hasSession()) {
            $request->getSession()->set(Security::AUTHENTICATION_ERROR, $exception);
        }

        if ($exception instanceof BadCredentialsException) {
            $msg = 'Invalid credentials.';
        } else {
            $msg = $exception->getMessage();
        }
        return new JsonResponse(['error' => 1, 'message' => $msg]);
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->router->generate(self::LOGIN_ROUTE);
    }
}
