<?php

namespace App\Controller;

use App\Entity\Dashboard;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard", priority=10, name="dashboard_list")
     */
    public function list(): Response
    {
        return $this->render('dashboard/list.html.twig');
    }

    /**
     * @Route("/dashboard/create", name="dashboard_create")
     * @return Response
     */
    public function create(): Response
    {
        return $this->render('dashboard/form.html.twig');
    }

    /**
     * @Route("/dashboard/{id}", name="dashboard_edit")
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
