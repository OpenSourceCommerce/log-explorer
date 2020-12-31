<?php


namespace App\Controller;

use App\Services\LogView\LogViewServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogviewController extends AbstractController
{
    /**
     * @Route("/table/{name}/logview", name="logview")
     * @param string $name
     * @param LogViewServiceInterface $logViewService
     * @return Response
     */
    public function setting(string $name, LogViewServiceInterface $logViewService): Response
    {
        $logView = $logViewService->findByTable($name);
        return $this->render('logview/form.html.twig', [
            'logview' => $logView
        ]);
    }
}
