<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserToken;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

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
     * @return Response
     */
    public function confirmation(UserToken $userToken): Response
    {
        if ($userToken->getDeletedAt()) {
            throw new NotFoundHttpException();
        }
        return $this->render('user/confirmation.html.twig', [
            'token' => $userToken,
        ]);
    }

    /**
     * @Route("/profile", priority=10, name="user_profile", methods = "GET")
     * @return Response
     */
    public function profile(): Response
    {
        return $this->render('user/profile.html.twig', [
            'user' => $this->getUser(),
        ]);
    }
}
