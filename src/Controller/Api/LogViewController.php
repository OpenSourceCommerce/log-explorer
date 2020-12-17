<?php


namespace App\Controller\Api;


use App\Entity\LogView;
use App\Form\LogViewColumnType;
use App\Services\LogView\LogViewServiceInterface;
use App\ServicesLogViewColumn\LogViewColumnServiceInterface;
use Doctrine\DBAL\Exception;
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
     * @Route("/api/v1/logview/list", name="log_receiver", methods={"GET"})
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
     * @Route("/api/v1/logview/{uuid}/setting/columns", name="logview_column_setting", methods={"GET"})
     * @param LogView $logView
     * @param LogViewServiceInterface $logviewService
     * @param Request $request
     * @return array
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
     * @Route("/api/v1/logview/{uuid}/setting/columns", name="update_logview_column_setting", methods={"PUT"})
     * @param LogView $logView
     * @param LogViewColumnServiceInterface $logViewColumnService
     * @param Request $request
     * @return JsonResponse
     */
    public function updateColumnSetting(
        LogView $logView,
        LogViewColumnServiceInterface $logViewColumnService,
        Request $request
    ) {
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
}
