<?php


namespace App\Controller\Api;


use App\Entity\LogView;
use App\Services\LogView\LogViewServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TableController
 * @package App\Controller\Api
 */
class LogViewController extends ApiController
{
    public function list(LogViewServiceInterface $dashboardService){
        $tables = $dashboardService->getDefault();

        return $this->responseSuccess([
            'data' => $tables
        ]);
    }

    /**
     * @Route("/api/logview/{uuid}", name="logview_detail", methods={"GET"})
     * @param LogView $logView
     * @return JsonResponse
     */
    public function detail(LogView $logView): JsonResponse
    {
        $graph = $logView->getGraph()->jsonSerialize();
        $graph['lines'] = $logView->getGraph()->getLines()->toArray();
        return $this->responseSuccess([
            'table' => $logView->getTable()->getName(),
            'graph' => $graph
        ]);
    }
}
