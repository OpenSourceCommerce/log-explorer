<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserToken;
use App\Exceptions\ExpiredUserTokenException;
use App\Services\UserToken\UserTokenServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Services\Clickhouse\ClickhouseServiceInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/user", priority=10, name="user", methods = "GET")
     */
    public function index(): Response
    {
        return $this->render('user/list.html.twig');
    }

    /**
     * @Route("/user/create", name="user_create", methods = "GET")
     * @return Response
     */
    public function create(): Response
    {
        return $this->render('user/form.html.twig');
    }

    /**
     * @Route("/user/{id}", name="user_update", methods = "GET")
     * @param User $user
     * @return Response
     */
    public function update(User $user): Response
    {
        return $this->render('user/form.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("/confirmation/{token}", name="user_confirmation", methods = "GET")
     * @param UserToken $userToken
     * @param UserTokenServiceInterface $userTokenService
     * @return Response
     */
    public function confirmation(UserToken $userToken, UserTokenServiceInterface $userTokenService): Response
    {
        if ($userTokenService->isInvalid($userToken)) {
            throw new ExpiredUserTokenException();
        }
        return $this->render('user/confirmation.html.twig', [
        'token' => $userToken,
        ]);
    }

    /**
     * @Route("/profile", priority=10, name="user_profile", methods = "GET")
     * @return Response
     */
    public function profile(ClickhouseServiceInterface $clickhouseService): Response
    {
        $types = $clickhouseService->getTypes();
        return $this->render('user/profile.html.twig', [
            'user' => $this->getUser(),
            'types' => json_encode($types),
        ]);
    }

    /**
     * @Route("/profile/change-password", name="user_change_password")
     * @return Response
     */
    public function changePassword(): Response
    {
        return $this->render('user/change_password.html.twig', [
            'user' => $this->getUser(),
        ]);
    }
}
