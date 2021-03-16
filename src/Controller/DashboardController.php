<?php

namespace App\Controller;

use App\Entity\Dashboard;
use App\Services\Dashboard\DashboardServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard", priority=10, name="dashboard_default")
     * @param DashboardServiceInterface $dashboardService
     * @return Response
     */
    public function default(DashboardServiceInterface $dashboardService): Response
    {
        $dashboard = $dashboardService->getDefaultDashboard();
        if ($dashboard) {
            return $this->redirectToRoute('dashboard', ['uuid' => $dashboard->getUuid()]);
        }
        return $this->redirectToRoute('dashboard_list');
    }

    /**
     * @Route("/dashboard/list", priority=10, name="dashboard_list")
     */
    public function list(): Response
    {
        return $this->render('dashboard/list.html.twig');
    }

    /**
     * @Route("/dashboard/create", priority=10, name="dashboard_create")
     * @return Response
     */
    public function create(): Response
    {
        return $this->render('dashboard/form.html.twig');
    }

    /**
     * @Route("/dashboard/edit/{id}", name="dashboard_edit")
     * @param Dashboard $dashboard
     * @return Response
     */
    public function edit(Dashboard $dashboard): Response
    {
        return $this->render('dashboard/form.html.twig', [
            'dashboard' => $dashboard,
        ]);
    }
}
