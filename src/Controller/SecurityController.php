<?php

namespace App\Controller;

use App\Entity\UserToken;
use App\Services\User\UserServiceInterface;
use App\Services\UserToken\UserTokenServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{

    /**
     * @var UserServiceInterface
     */
    private $userService;

    /**
     * SecurityController constructor.
     * @param UserServiceInterface $userService
     */
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @Route("/login", name="app_login")
     * @param AuthenticationUtils $authenticationUtils
     * @return Response
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('welcome');
        }
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     *
     * @codeCoverageIgnore
     */
    public function logout()
    {
        return $this->redirectToRoute('index');
    }

    /**
     * @Route("/password/forgot", name="forgot_password")
     * @return Response
     */
    public function forgot(): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('index');
        }

        return $this->render('security/forgot.html.twig');
    }

    /**
     * @Route("/password/reset/{token}", name="reset_password")
     * @param UserToken $userToken
     * @param UserTokenServiceInterface $userTokenService
     * @return RedirectResponse|Response
     */
    public function reset(
        UserToken $userToken,
        UserTokenServiceInterface $userTokenService
    ) {
        if ($userTokenService->isInvalid($userToken)) {
            throw new NotFoundHttpException();
        }

        return $this->render('security/reset.html.twig', ['token' => $userToken->getToken()]);
    }
}
