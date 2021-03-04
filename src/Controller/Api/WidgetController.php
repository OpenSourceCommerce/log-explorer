<?php


namespace App\Controller\Api;


use App\Entity\Widget;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use App\Exceptions\ColumnNotExistException;
use App\Exceptions\NoDataException;
use App\Exceptions\TableNotExistException;
use App\Form\WidgetType;
use App\Services\Database\DatabaseServiceInterface;
use App\Services\Widget\WidgetServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Annotation\Route;

class WidgetController extends ApiController
{
    /**
     * @Route("/api/widget", methods = "GET")
     * @param Request $request
     * @param WidgetServiceInterface $widgetService
     * @return JsonResponse
     */
    public function list(Request $request, WidgetServiceInterface $widgetService): JsonResponse
    {
        $data = $widgetService->getWidgets($request->query->all());
        return $this->responseSuccess([
            'data' => $data,
        ]);
    }

    /**
     * @Route("/api/widget/{id}", methods = "GET")
     * @param Widget $widget
     * @return JsonResponse
     */
    public function widget(Widget $widget): JsonResponse
    {
        return $this->responseSuccess([
            'data' => $widget,
        ]);
    }

    /**
     * @Route("/api/widget/create", methods = "POST")
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @param WidgetServiceInterface $widgetService
     * @param UrlGeneratorInterface $urlGenerator
     * @return JsonResponse
     */
    public function create(
        Request $request,
        DatabaseServiceInterface $databaseService,
        WidgetServiceInterface $widgetService,
        UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(WidgetType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $widget = $form->getData();
            try {
                $databaseService->checkColumnBelongToTable($widget->getTable(), $widget->getColumn());
            } catch (TableNotExistException $e) {
                return $this->responseError('Table does not exist');
            } catch (ColumnNotExistException $e) {
                return $this->responseError('Column does not exist');
            }
            $widget = $widgetService->createWidget($form->getData());

            return $this->responseSuccess([
                'redirect' => $urlGenerator->generate('widget_edit', ['id' => $widget->getId()]),
                'id' => $widget->getId(),
            ]);
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/widget/{id}", methods = "PUT")
     * @param Widget $widget
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @param WidgetServiceInterface $widgetService
     * @return JsonResponse
     */
    public function update(
        Widget $widget,
        Request $request,
        DatabaseServiceInterface $databaseService,
        WidgetServiceInterface $widgetService): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(WidgetType::class, $widget);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $widget = $form->getData();
            try {
                $databaseService->checkColumnBelongToTable($widget->getTable(), $widget->getColumn());
            } catch (TableNotExistException $e) {
                return $this->responseError('Table does not exist');
            } catch (ColumnNotExistException $e) {
                return $this->responseError('Column does not exist');
            }
            $widgetService->updateWidget($widget);

            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/widget/{id}", methods = "DELETE")
     * @param Widget $widget
     * @param WidgetServiceInterface $widgetService
     * @return JsonResponse
     */
    public function delete(Widget $widget, WidgetServiceInterface $widgetService): JsonResponse
    {
        $widgetService->delete($widget);
        return $this->responseSuccess();
    }
}
