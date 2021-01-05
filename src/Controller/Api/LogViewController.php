<?php


namespace App\Controller\Api;


use App\Entity\LogView;
use App\Form\LogViewColumnType;
use App\Services\Clickhouse\Connection;
use App\Services\LogView\LogViewServiceInterface;
use App\Form\ColumnsType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TableController
 * @package App\Controller\Api
 */
class LogViewController extends ApiController
{
    /**
     * @Route("/api/logview/list", name="log_receiver", methods={"GET"})
     * @param LogViewServiceInterface $logViewService
     * @return JsonResponse
     */
    public function list(LogViewServiceInterface $logViewService): JsonResponse
    {
        $logView = $logViewService->list();

        return $this->responseSuccess([
            'data' => $logView
        ]);
    }

    /**
     * @Route("/api/logview/{uuid}/setting/columns", name="logview_column_setting", methods={"GET"})
     * @param LogView $logView
     * @param LogViewServiceInterface $logviewService
     * @param Request $request
     * @return JsonResponse
     */
    public function getColumnSetting(LogView $logView, LogViewServiceInterface $logviewService, Request $request): JsonResponse
    {
        $chunk = $request->get('chunk', 0);
        $columns = $logviewService->getColumnSetting($logView);

        if (!empty($chunk) && is_numeric($chunk)) {
            $columns = array_chunk($columns, $chunk);
        }

        return $this->responseSuccess([
            'data' => $columns
        ]);
    }

    /**
     * @Route("/api/logview/{uuid}", name="logview_detail", methods={"GET"})
     * @param LogView $logView
     * @param Connection $connection
     * @return JsonResponse
     */
    public function detail(LogView $logView, Connection $connection): JsonResponse
    {
        $graph = $logView->getGraph()->jsonSerialize();
        $graph['lines'] = $logView->getGraph()->getLines()->toArray();
        $columns = $connection->getRawColumns($logView->getTable());
        $columns = array_column($columns, 'name');
        return $this->responseSuccess([
            'table' => $logView->getTable(),
            'graph' => $graph,
            'summary' => $logView->getSummary(),
            'columns' => $columns,
        ]);
    }

    /**
     * @Route("/api/logview/{uuid}/setting/columns", name="update_logview_column_setting", methods={"PUT"})
     * @param LogView $logView
     * @param Request $request
     * @param LogViewServiceInterface $logViewService
     * @return JsonResponse
     */
    public function updateColumnSetting(
        LogView $logView,
        Request $request,
        LogViewServiceInterface $logViewService
    ): JsonResponse {
        $data = $request->request->all();
        $form = $this->createForm(LogViewColumnType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $column = $form->get('column')->getData();
            $visible = $form->get('visible')->getData();
            $logViewService->setVisibleColumn($logView, $column, !empty($visible));
            return $this->responseSuccess();
        }

        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/logview/{uuid}/summary", methods={"PUT"})
     * @param LogView $logView
     * @param Request $request
     * @param LogViewServiceInterface $logViewService
     * @param Connection $connection
     * @return JsonResponse
     */
    public function updateSummary(
        LogView $logView,
        Request $request,
        LogViewServiceInterface $logViewService,
        Connection $connection
    ): JsonResponse {
        $data = $request->request->all();
        $columns = $connection->getRawColumns($logView->getTable());
        $columns = array_column($columns, 'name');
        $form = $this->createForm(ColumnsType::class, null, ['column_list' => $columns]);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $summary = $form->get('columns')->getData();
            $logViewService->setSummary($logView, $summary);
            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }
}
