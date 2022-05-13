<?php

namespace App\Security;

use App\Services\User\UserServiceInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Contracts\Translation\TranslatorInterface;

class ApiTokenAuthenticator extends AbstractAuthenticator
{
    private $translator;
    private $userService;
    private $parameterBag;

    /**
     * @param TranslatorInterface $translator
     * @param UserServiceInterface $userService
     * @param ParameterBagInterface $parameterBag
     */
    public function __construct(
        TranslatorInterface $translator,
        UserServiceInterface $userService,
        ParameterBagInterface $parameterBag
    )
    {
        $this->translator = $translator;
        $this->userService = $userService;
        $this->parameterBag = $parameterBag;
    }

    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning false will cause this authenticator
     * to be skipped.
     * @param Request $request
     * @return bool
     */
    public function supports(Request $request): bool
    {
        return substr($request->getRequestUri(), 0, 8) === '/api/v1/' || $request->headers->has('X-AUTH-TOKEN');
    }


    public function authenticate(Request $request): Passport
    {
        $apiToken = $request->headers->get('X-AUTH-TOKEN');
        if (null === $apiToken) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            throw new CustomUserMessageAuthenticationException('No API token provided');
        }

        $appApiToken = $this->parameterBag->get('app.api_token');

        if($apiToken !== $appApiToken){
            throw new CustomUserMessageAuthenticationException('Invalid Token');
        }

        return new SelfValidatingPassport(new UserBadge($apiToken, function ($userIdentifier) {
            return $this->userService->findAdminUser();
        }));
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'message' => $this->translator->trans('Invalid Token or User does not exist'),
        ];

        return new JsonResponse($data, Response::HTTP_FORBIDDEN);
    }

    public function start(Request $request, AuthenticationException $authException = null): Response
    {
        $data = [
            'error' => 1,
            // you might translate this message
            'msg' => 'Authentication Required'
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}


