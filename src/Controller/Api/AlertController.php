<?php


namespace App\Controller\Api;

use App\Entity\Alert;
use App\Form\AlertType;
use App\Services\Alert\AlertServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class AlertController extends ApiController
{
    /**
     * @Route ("/api/alert", methods={"GET"})
     */
    public function list(AlertServiceInterface $alertService)
    {
        $data = $alertService->findAll();

        return $this->responseSuccess([
            'data' => $data
        ]);
    }

    /**
     * @Route ("/api/alert", methods={"POST"})
     */
    public function create(Request $request, AlertServiceInterface $alertService, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(AlertType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $alert = $form->getData();

            $alert = $alertService->createOrUpdate($alert);

            if ($alert->getId()) {
                return $this->responseSuccess([
                    'redirect' => $urlGenerator->generate('alert_update', ['id' => $alert->getId()]),
                    'id' => $alert->getId(),
                ]);
            }
        }

        return $this->responseFormError($form);
    }

    /**
     * @Route ("/api/alert/{id}", methods={"PUT"})
     */
    public function update(Alert $alert, Request $request, AlertServiceInterface $alertService, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(AlertType::class, $alert);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $alert = $form->getData();

            $alert = $alertService->createOrUpdate($alert);

            if ($alert->getId()) {
                return $this->responseSuccess([
                    'redirect' => $urlGenerator->generate('alert_update', ['id' => $alert->getId()]),
                    'id' => $alert->getId(),
                ]);
            }
        }

        return $this->responseFormError($form);
    }

    /**
     * @Route ("/api/alert/{id}", methods={"GET"})
     */
    public function show(Alert $alert): JsonResponse
    {

        return $this->responseSuccess(['data' => $alert]);
    }

    /**
     * @Route ("/api/alert/{id}/status", methods={"PUT"})
     */
    public function updateStatus(Alert $alert, AlertServiceInterface $alertService): JsonResponse
    {
        $alert = $alertService->updateStatus($alert);

        return $this->responseSuccess(['data' => $alert]);
    }

    /**
     * @Route ("/api/alert/{id}", methods={"DELETE"})
     *
     * @param Alert $alert
     * @param AlertServiceInterface $alertService
     * @return JsonResponse
     */
    public function delete(Alert $alert, AlertServiceInterface $alertService): JsonResponse
    {
        $alertService->delete($alert);

        return $this->responseSuccess([]);
    }
}
