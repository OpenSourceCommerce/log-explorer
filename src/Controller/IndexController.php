<?php

namespace App\Controller;

use App\Entity\LogView;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/{uuid}", defaults={"uuid"=null}, name="index")
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
}
