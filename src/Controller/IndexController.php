<?php

namespace App\Controller;

use App\Entity\Dashboard;
use App\Entity\LogView;
use App\Services\LogView\LogViewServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/", priority=10, name="welcome")
     * @param LogViewServiceInterface $logViewService
     * @return Response
     */
    public function welcome(LogViewServiceInterface $logViewService): Response
    {
        $logView = $logViewService->getDefault();
        if ($logView) {
            return $this->redirectToRoute('index', ['uuid' => $logView->getUuid()]);
        }
        return $this->render('index/welcome.html.twig');
    }

    /**
     * @Route("/log-view/{uuid}", defaults={"uuid"=null}, name="index")
     * @param string|null $uuid
     * @param LogView|null $logView
     * @return Response
     */
    public function index(?string $uuid, LogView $logView = null): Response
    {
        if (is_null($logView) && $uuid) {
            throw new NotFoundHttpException();
        }
        return $this->render('index/index.html.twig', [
            'uuid' => $uuid,
        ]);
    }

    /**
     * @Route("/dashboard/{uuid}", name="dashboard")
     * @param Dashboard $dashboard
     * @return Response
     */
    public function dashboard(Dashboard $dashboard): Response
    {
        return $this->render('index/dashboard.html.twig', [
            'dashboard' => $dashboard,
        ]);
    }
}
