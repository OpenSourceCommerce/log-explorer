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
     * @Route("/login", name="app_login", methods={"GET", "POST"})
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
     * @codeCoverageIgnore
     */
    public function logout()
    {
        return $this->redirectToRoute('index');
    }

    /**
     * @return Response
     */
    public function forgot()
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('index');
        }

        return $this->render('security/forgot.html.twig');
    }

    /**
     * @param UserToken $userToken
     * @param ContainerBagInterface $containerBag
     * @param UserTokenServiceInterface $userTokenService
     * @return RedirectResponse|Response
     */
    public function reset(
        UserToken $userToken,
        ContainerBagInterface $containerBag,
        UserTokenServiceInterface $userTokenService
    ) {
        $tokenExpiration = $containerBag->get('password.forgot.token.expiration');
        if (!empty($tokenExpiration)) {
            if (!$userTokenService->isValidateDate($userToken->getCreatedAt(), $tokenExpiration)) {
                throw new NotFoundHttpException();
            }
        }

        return $this->render('security/reset.html.twig', ['token' => $userToken->getToken()]);
    }
}
