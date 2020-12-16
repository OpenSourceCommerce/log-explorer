<?php


namespace App\Controller\Api;


use App\Entity\LogView;
use App\Form\ColumnsType;
use App\Services\Column\ColumnServiceInterface;
use App\Services\LogView\LogViewServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
            'graph' => $graph,
            'summary' => $logView->getSummary()->toArray(),
            'columns' => $logView->getTable()->getColumns()->toArray(),
        ]);
    }

    /**
     * @Route("/api/logview/{uuid}/summary", methods={"PUT"})
     * @param LogView $logView
     * @param Request $request
     * @param ColumnServiceInterface $columnService
     * @param LogViewServiceInterface $logViewService
     * @return JsonResponse
     */
    public function updateSummary(LogView $logView, Request $request, ColumnServiceInterface $columnService, LogViewServiceInterface $logViewService): JsonResponse
    {
        $data = $request->request->all();
        $columns = $logView->getTable()->getColumns()->toArray();
        $list = [];
        foreach ($columns as $column) {
            $list[$column->getId()] = $column->getId();
        }
        $form = $this->createForm(ColumnsType::class, null, ['column_list' => $list]);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $columns = $columnService->findIn($form->get('columns')->getData());
            $logViewService->setSummary($logView, $columns);
            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }
}
