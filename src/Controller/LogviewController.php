<?php


namespace App\Controller;

use App\Entity\Table;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogviewController extends AbstractController
{
    /**
     * @Route("/table/{name}/logview", name="logview")
     * @param Table $table
     * @return Response
     */
    public function setting(Table $table): Response
    {
        return $this->render('logview/form.html.twig', [
            'logview' => $table->getLogView()
        ]);
    }
}
