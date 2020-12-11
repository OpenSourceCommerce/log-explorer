<?php


namespace App\Controller;


use App\Entity\Graph;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GraphController extends AbstractController
{
    /**
     * @Route("/graph", name="graph")
     */
    public function index(): Response
    {
        return $this->render('graph/index.html.twig');
    }

    /**
     * @Route("/graph/create", name="graph_create")
     */
    public function create(): Response
    {
        return $this->render('graph/form.html.twig');
    }

    /**
     * @Route("/graph/{id}", name="graph_update")
     * @param Graph $graph
     * @return Response
     */
    public function update(Graph $graph): Response
    {
        return $this->render('graph/form.html.twig', ['graph' => $graph]);
    }
}
