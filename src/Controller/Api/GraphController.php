<?php


namespace App\Controller\Api;


use App\Entity\Graph;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use App\Form\GraphType;
use App\Services\Graph\GraphServiceInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Annotation\Route;

class GraphController extends ApiController
{
    /**
     * @Route("/api/graph", methods = "GET")
     * @param GraphServiceInterface $graphService
     * @return Response
     */
    public function list(GraphServiceInterface $graphService): Response
    {
        $data = $graphService->getAllGraph();
        return $this->responseSuccess([
            'data' => $data,
        ]);
    }

    /**
     * @Route("/api/graph/{id}", methods = "GET")
     * @param Graph $graph
     * @return Response
     */
    public function graph(Graph $graph): Response
    {
        $data = $graph->jsonSerialize();
        $data['lines'] = $graph->getLines()->toArray();
        return $this->responseSuccess([
            'data' => $data,
        ]);
    }

    /**
     * @Route("/api/graph/create", methods = "POST")
     * @param Request $request
     * @param GraphServiceInterface $graphService
     * @param UrlGeneratorInterface $urlGenerator
     * @return Response
     */
    public function create(Request $request, GraphServiceInterface $graphService, UrlGeneratorInterface $urlGenerator): Response
    {
        $data = $request->request->all();
        $form = $this->createForm(GraphType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $graph = $form->getData();
            try {
                $graph = $graphService->createGraph($graph, $form->get('lines')->getData());
            } catch (ActionDeniedException $e) {
                return $this->responseError('Can not create graph');
            } catch (BadSqlException $e) {
                return $this->responseError($e->getMessage());
            }


            return $this->responseSuccess([
                'redirect' => $urlGenerator->generate('graph_update', ['id' => $graph->getId()])
            ]);
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/graph/{id}", methods = "PUT")
     * @param Graph $graph
     * @param Request $request
     * @param GraphServiceInterface $graphService
     * @param UrlGeneratorInterface $urlGenerator
     * @return Response
     */
    public function update(Graph $graph, Request $request, GraphServiceInterface $graphService, UrlGeneratorInterface $urlGenerator): Response
    {
        $data = $request->request->all();
        $form = $this->createForm(GraphType::class, $graph);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $graph = $form->getData();
            try {
                $graphService->updateGraph($graph, $form->get('lines')->getData());
            } catch (ActionDeniedException $e) {
                return $this->responseError('Can not update graph');
            } catch (BadSqlException $e) {
                return $this->responseError($e->getMessage());
            }


            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/graph/{id}", methods = "DELETE")
     * @param Graph $graph
     * @param GraphServiceInterface $graphService
     * @return Response
     */
    public function delete(Graph $graph, GraphServiceInterface $graphService): Response
    {
        if ($graph->getLogView()) {
            $this->responseError('Can not delete graph of log view');
        }
        $graphService->delete($graph);
        return $this->responseSuccess();
    }
}
