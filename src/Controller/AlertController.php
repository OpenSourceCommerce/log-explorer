<?php


namespace App\Controller;


use App\Entity\Alert;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AlertController extends AbstractController
{
    /**
     * @Route("/alert", priority=10, name="alert")
     */
    public function index(): Response
    {
        return $this->render('alert/index.html.twig');
    }

    /**
     * @Route("/alert/create", name="alert_create")
     */
    public function create(): Response
    {
        return $this->render('alert/form.html.twig');
    }

    /**
     * @Route("/alert/{id}", name="alert_update")
     * @param Alert $alert
     * @return Response
     */
    public function update(Alert $alert): Response
    {
        return $this->render('alert/form.html.twig', ['alert' => $alert]);
    }
}
