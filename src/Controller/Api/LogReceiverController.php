<?php

namespace App\Controller\Api;

use App\Form\LogType;
use App\Services\Log\LogServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogReceiverController extends ApiController
{
    /**
     * @Route("/api/v1/log/receiver", name="app_api_log_receiver", methods={"POST"})
     * @param Request $request
     * @param LogServiceInterface $logService
     * @return Response
     */
    public function index(Request $request, LogServiceInterface $logService): Response
    {
        $data = $request->request->all();
        $form = $this->createForm(LogType::class);
        $form->submit($data);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                try {
                    $logService->addItems($form->get('table')->getData(), $form->get('data')->getData());
                    return $this->responseSuccess();
                } catch (Exception $e) {
                    return $this->responseError($e->getMessage());
                }
            }

            return $this->responseFormError($form);
        }

        return $this->responseError();
    }
}
