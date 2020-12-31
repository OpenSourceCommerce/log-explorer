<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\UserToken;
use App\Form\ChangePasswordFormType;
use App\Form\PasswordType;
use App\Form\UserType;
use App\Services\User\UserServiceInterface;
use App\Services\UserToken\UserTokenServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends ApiController
{
    /**
     * @Route("/api/user", methods = "GET")
     * @param Request $request
     * @param UserServiceInterface $userService
     * @return JsonResponse
     */
    public function list(Request $request, UserServiceInterface $userService): JsonResponse
    {
        $data = $userService->getAllUser($request->query->all());
        return $this->responseSuccess(['data' => $data]);
    }

    /**
     * @Route("/api/user/{id}", methods = "GET")
     * @param User $user
     * @return JsonResponse
     */
    public function user(User $user): JsonResponse
    {
        return $this->responseSuccess([
            'data' => $user
        ]);
    }

    /**
     * @Route("/api/user/create", methods = "POST")
     * @param Request $request
     * @param UserServiceInterface $userService
     * @param UrlGeneratorInterface $urlGenerator
     * @return JsonResponse
     */
    public function create(
        Request $request,
        UserServiceInterface $userService,
        UrlGeneratorInterface $urlGenerator
    ): JsonResponse {
        $form = $this->createForm(UserType::class, null, ['is_admin' => true]);
        $form->submit($request->request->all());
        if ($form->isSubmitted() && $form->isValid()) {
            $user = $userService->createUser($form->getData());
            return $this->responseSuccess([
                'redirect' => $urlGenerator->generate('user_update', ['id' => $user->getId()])
            ]);
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/user/{id}", methods = "PUT")
     * @param User $user
     * @param Request $request
     * @param UserServiceInterface $userService
     * @return JsonResponse
     */
    public function update(
        User $user,
        Request $request,
        UserServiceInterface $userService
    ): JsonResponse {
        $form = $this->createForm(UserType::class, $user, ['is_admin' => true]);
        $form->submit($request->request->all());
        if ($form->isSubmitted() && $form->isValid()) {
            $userService->updateUser($form->getData());
            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/confirmation/{token}", methods = "PUT")
     * @param UserToken $userToken
     * @param Request $request
     * @param UserServiceInterface $userService
     * @param UserTokenServiceInterface $userTokenService
     * @return JsonResponse
     */
    public function confirmation(
        UserToken $userToken,
        Request $request,
        UserServiceInterface $userService,
        UserTokenServiceInterface $userTokenService
    ): JsonResponse {
        if ($userTokenService->isInvalid($userToken)) {
            return $this->responseError('Expired token');
        }
        $form = $this->createForm(PasswordType::class);
        $form->submit($request->request->all());
        if ($form->isSubmitted() && $form->isValid()) {
            $userService->setConfirmation($userToken->getUser(), $form->get('password')->getData());
            $userTokenService->deleteOfUser($userToken->getUser());
            return $this->responseSuccess(['redirect' => '/']);
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/user/status/{id}", methods = "PUT")
     * @param User $user
     * @param Request $request
     * @param UserServiceInterface $userService
     * @return JsonResponse
     */
    public function setStatus(
        User $user,
        Request $request,
        UserServiceInterface $userService
    ): JsonResponse {
        if ($user->getId() === $this->getUser()->getId()) {
            return $this->responseError('Can not update your status by yourself');
        }
        if ($request->request->has('is_active')) {
            $userService->setStatus($user, $request->request->get('is_active'));
            return $this->responseSuccess();
        }
        return $this->responseError('Invalid request');
    }

    /**
     * @Route("/api/user/{id}", methods = "DELETE")
     * @param User $user
     * @param UserServiceInterface $userService
     * @param UserTokenServiceInterface $userTokenService
     * @return JsonResponse
     */
    public function delete(
        User $user,
        UserServiceInterface $userService,
        UserTokenServiceInterface $userTokenService
    ): JsonResponse {
        if ($user->getId() === $this->getUser()->getId()) {
            return $this->responseError('Can not delete yourself');
        }
        $userTokenService->deleteOfUser($user);
        $userService->delete($user);
        return $this->responseSuccess();
    }

    /**
     * @Route("/api/profile", methods = "GET")
     * @return JsonResponse
     */
    public function profile(): JsonResponse {
        return $this->responseSuccess([
            'data' => $this->getUser()
        ]);
    }

    /**
     * @Route("/api/profile", methods = "PUT")
     * @param Request $request
     * @param UserServiceInterface $userService
     * @return JsonResponse
     */
    public function updateProfile(
        Request $request,
        UserServiceInterface $userService
    ): JsonResponse {
        $user = $this->getUser();
        $form = $this->createForm(UserType::class, $user, ['is_admin' => false]);
        $form->submit($request->request->all());
        if ($form->isSubmitted() && $form->isValid()) {
            $userService->updateUser($form->getData());
            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/user/password", name="api_change_password")
     * Create new user
     * @param Request $request
     * @param UserServiceInterface $userService
     * @return Response
     */
    public function password(Request $request, UserServiceInterface $userService)
    {
        $user = $this->getUser();
        $form = $this->createForm(ChangePasswordFormType::class);
        $form->handleRequest($request);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $userService->setPassword($user, $form->get('password')->getData());
            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }
}
