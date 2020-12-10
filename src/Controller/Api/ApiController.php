<?php


namespace App\Controller\Api;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class ApiController
 * @package App\Controller\Api
 */
abstract class ApiController extends AbstractController
{
    /**
     * @param FormInterface $form
     * @return JsonResponse
     */
    protected function responseFormError(FormInterface $form): JsonResponse
    {
        $errors = ['error' => 1, 'fields' => []];
        foreach ($form->getErrors(true) as $key => $error) {
            /** @var FormError $error */
            $errors['fields'][$error->getOrigin()->getName()] = $error->getMessage();
        }
        return $this->responseError($errors);
    }

    /**
     * @param array|string $data
     * @return JsonResponse
     */
    protected function responseError($data = []): JsonResponse
    {
        if (empty($data)) {
            $data = "Unknown error";
        }

        if (is_string($data)) {
            $data = [
                'message' => $data
            ];
        }
        if (!isset($data['error'])) {
            $data['error'] = 1;
        }
        return new JsonResponse($data);
    }

    /**
     * @param array $data
     * @return JsonResponse
     */
    protected function responseSuccess($data = []): JsonResponse
    {
        $data['error'] = 0;
        return new JsonResponse($data);
    }
}
