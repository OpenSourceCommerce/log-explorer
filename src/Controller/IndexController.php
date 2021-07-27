<?php

namespace App\Controller;

use App\Entity\Dashboard;
use App\Entity\LogView;
use App\Services\Dashboard\DashboardServiceInterface;
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
     * @param DashboardServiceInterface $dashboardService
     * @return Response
     */
    public function welcome(LogViewServiceInterface $logViewService, DashboardServiceInterface $dashboardService): Response
    {
        $dashboard = $dashboardService->getDefaultDashboard();
        if ($dashboard && $dashboard->getDashboardWidgets()->count() > 0) {
            return $this->redirectToRoute('dashboard', ['uuid' => $dashboard->getUuid()]);
        }
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
     * @Route("/dashboard/{uuid}", name="dashboard", priority=10)
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
