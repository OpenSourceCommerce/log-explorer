<?php


namespace App\Controller\Api;


use App\Entity\LogView;
use App\Form\LogViewColumnType;
use App\Services\LogView\LogViewServiceInterface;
use App\ServicesLogViewColumn\LogViewColumnServiceInterface;
use Doctrine\DBAL\Exception;
use App\Form\ColumnsType;
use App\Services\Column\ColumnServiceInterface;
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
     * @param LogViewServiceInterface $logviewService
     * @return JsonResponse
     */
    public function list(LogViewServiceInterface $logviewService)
    {
        $logview = $logviewService->list();

        return $this->responseSuccess([
            'data' => $logview
        ]);
    }

    /**
     * @Route("/api/logview/{uuid}/setting/columns", name="logview_column_setting", methods={"GET"})
     * @param LogView $logView
     * @param LogViewServiceInterface $logviewService
     * @param Request $request
     * @return JsonResponse
     */
    public function getColumnSetting(LogView $logView, LogViewServiceInterface $logviewService, Request $request)
    {
        $chunk = $request->get('chunk', 0);
        $columns = $logviewService->getColumnSetting($logView)->toArray();

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
     * @Route("/api/logview/{uuid}/setting/columns", name="update_logview_column_setting", methods={"PUT"})
     * @param LogView $logView
     * @param LogViewColumnServiceInterface $logViewColumnService
     * @param Request $request
     * @return JsonResponse
     */
    public function updateColumnSetting(
        LogView $logView,
        LogViewColumnServiceInterface $logViewColumnService,
        Request $request
    )
    {
        $data = $request->request->all();
        $form = $this->createForm(LogViewColumnType::class);
        $form->submit($data);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                try {
                    $data['visible'] = $form->get('visible')->getData();
                    $logViewColumn = $logViewColumnService->updateColumnSetting($logView,
                        $form->get('column')->getData(), $data);
                    return $this->responseSuccess([
                        'data' => $logViewColumn
                    ]);
                } catch (Exception $e) {
                    return $this->responseError($e->getMessage());
                }
            }

            return $this->responseFormError($form);
        }

        return $this->responseError();
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
