<?php


namespace App\Controller\Api;

use App\Entity\Export;
use App\Entity\User;
use App\Form\ExportType;
use App\Services\Export\ExportServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ExportController extends ApiController
{
    /**
     * @Route ("/api/export", methods={"GET"})
     */
    public function list(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        $data = $user->getExports();

        return $this->responseSuccess([
            'data' => $data->toArray()
        ]);
    }

    /**
     * @Route ("/api/export", methods={"POST"})
     */
    public function create(Request $request, ExportServiceInterface $exportService, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(ExportType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var Export $export */
            $export = $form->getData();
            $export->setUser($this->getUser());

            $exportService->createOrUpdate($export);

            return $this->responseSuccess([
                'redirect' => $urlGenerator->generate('export')
            ]);
        }

        return $this->responseFormError($form);
    }
}
