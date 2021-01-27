<?php

namespace App\Controller;

use App\Entity\Widget;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class WidgetController extends AbstractController
{
    /**
     * @Route("/widget", priority=10, name="widget_list")
     */
    public function list(): Response
    {
        return $this->render('widget/list.html.twig');
    }

    /**
     * @Route("/widget/create", name="widget_create")
     */
    public function create(): Response
    {
        return $this->render('widget/form.html.twig');
    }

    /**
     * @Route("/widget/{id}", name="widget_edit")
     * @param Widget $widget
     * @return Response
     */
    public function edit(Widget $widget): Response
    {
        return $this->render('widget/form.html.twig', [
            'widget' => $widget,
        ]);
    }
}
