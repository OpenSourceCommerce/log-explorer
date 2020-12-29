<?php

namespace App\Controller\Api;

use App\Exceptions\AppException;
use App\Exceptions\TokenExpiredException;
use App\Exceptions\TokenNotFoundException;
use App\Form\ForgotPasswordFormType;
use App\Form\ResetPasswordFormType;
use App\Services\User\UserServiceInterface;
use App\Services\UserToken\UserTokenServiceInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class SecurityController extends ApiController
{
    /**
     * @Route("/api/password/forgot", name="api_forgot_password")
     * @param Request $request
     * @param UserServiceInterface $userService
     * @return Response
     */
    public function forgot(
        Request $request,
        UserServiceInterface $userService
    ): Response
    {
        if ($this->getUser()) {
            return $this->responseError();
        }
        $form = $this->createForm(ForgotPasswordFormType::class);
        $form->handleRequest($request);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $user = $userService->findByEmail($form->get('email')->getData());
            $userService->forgotPassword($user);

            return $this->responseSuccess();
        }

        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/password/reset", name="api_reset_password")
     * @param Request $request
     * @param ContainerBagInterface $containerBag
     * @param UserTokenServiceInterface $userTokenService
     * @param UserServiceInterface $userService
     * @param UrlGeneratorInterface $urlGenerator
     * @return RedirectResponse|Response
     * @throws AppException
     */
    public function reset (
        Request $request,
        ContainerBagInterface $containerBag,
        UserTokenServiceInterface $userTokenService,
        UserServiceInterface $userService,
        UrlGeneratorInterface $urlGenerator
    ) {
        $token = $request->request->get('token');
        $forgot = $userTokenService->findByToken($token);
        if (empty($forgot)) {
            throw new TokenNotFoundException();
        }
        $tokenExpiration = $containerBag->get('password.forgot.token.expiration');
        if (!empty($tokenExpiration)) {
            if (!$userTokenService->isValidateDate($forgot->getCreatedAt(), $tokenExpiration)) {
                throw new TokenExpiredException();
            }
        }
        $form = $this->createForm(ResetPasswordFormType::class);
        $form->handleRequest($request);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $userService->resetPassword($forgot, $form->get('password')->getData());
            return $this->responseSuccess(['redirect' => $urlGenerator->generate('app_login')]);
        }

        return $this->responseFormError($form);
    }
}
