<?php


namespace App\Controller;


use App\Entity\LogView;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogviewController extends AbstractController
{
    /**
     * @Route("/logview/{uuid}", name="logview")
     * @param LogView $logView
     * @return Response
     */
    public function setting(LogView $logView): Response
    {
        return $this->render('logview/form.html.twig', [
            'logview' => $logView
        ]);
    }
}
