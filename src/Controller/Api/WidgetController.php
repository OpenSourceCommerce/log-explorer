<?php


namespace App\Controller\Api;


use App\Entity\Dashboard;
use App\Entity\User;
use App\Entity\Widget;
use App\Entity\WidgetQuery;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use App\Exceptions\ColumnNotExistException;
use App\Exceptions\NoDataException;
use App\Exceptions\TableNotExistException;
use App\Form\WidgetQueryType;
use App\Form\WidgetType;
use App\Services\Database\DatabaseServiceInterface;
use App\Services\Stream\StreamServiceInterface;
use App\Services\Widget\WidgetServiceInterface;
use App\Services\WidgetQuery\WidgetQueryServiceInterface;
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
        UrlGeneratorInterface $urlGenerator,
        StreamServiceInterface $streamService
    ): JsonResponse {
        $data = $request->request->all();
        $form = $this->createForm(WidgetType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var Widget $widget */
            $widget = $form->getData();
            $define = $widgetService->getWidgetInterface($widget);
            if (!$define->hasSingleResult()) {
                if (empty($widget->getColumn())) {
                    return $this->responseError('Column is required');
                }
                try {
                    $columns = explode(',', $widget->getColumn());
                    $columns = array_filter($columns, function ($column) {
                        return !empty($column);
                    });

                    foreach ($columns as $column) {
                        $databaseService->checkColumnBelongToTable($widget->getTable(), $column);
                    }

                    $columns = array_unique($columns);
                    $widget->setColumn(implode(',', $columns));

                    if ($widget->getQuery()) {
                        $streamService->getWidgetData(new Dashboard(), $define, [
                            'filter' => '1 <> 1 and ' . $widget->getQuery(),
                        ]);
                    }
                } catch (TableNotExistException $e) {
                    return $this->responseError('Table does not exist');
                } catch (ColumnNotExistException $e) {
                    return $this->responseError('Column does not exist');
                } catch (\Exception $e) {
                    return $this->responseError('Filter is not a valid SQL query');
                }
            }
            $widget = $widgetService->createWidget($widget);

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
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function update(
        Widget $widget,
        Request $request,
        DatabaseServiceInterface $databaseService,
        WidgetServiceInterface $widgetService,
        StreamServiceInterface $streamService
    ): JsonResponse {
        $data = $request->request->all();
        $form = $this->createForm(WidgetType::class, $widget);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $widget = $form->getData();
            try {
                $columns = explode(',', $widget->getColumn());

                $columns = array_filter($columns, function ($column) {
                    return !empty($column);
                });

                foreach ($columns as $column) {
                    $databaseService->checkColumnBelongToTable($widget->getTable(), trim($column));
                }

                $columns = array_unique($columns);
                $widget->setColumn(implode(',', $columns));

                if ($widget->getQuery()) {
                    $define = $widgetService->getWidgetInterface($widget);
                    $streamService->getWidgetData(new Dashboard(), $define, [
                        'filter' => '1 <> 1 and ' . $widget->getQuery(),
                    ]);
                }
            } catch (TableNotExistException $e) {
                return $this->responseError('Table does not exist');
            } catch (ColumnNotExistException $e) {
                return $this->responseError('Column does not exist');
            } catch (\Exception $e) {
                return $this->responseError('Filter is not a valid SQL query');
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

    /**
     * @Route("/api/widget/queries/list", name="widget_queries", methods={"GET"})
     * @return JsonResponse
     */
    public function queries(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        return $this->responseSuccess([
            'data' => $user->getWidgetQueries()->toArray(),
        ]);
    }

    /**
     * @Route("/api/widget/queries", methods={"POST"})
     * @param Request $request
     * @param WidgetQueryServiceInterface $widgetQueryService
     * @return JsonResponse
     */
    public function createQuery(Request $request, WidgetQueryServiceInterface $widgetQueryService): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(WidgetQueryType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $query = $widgetQueryService->create($form->getData(), $this->getUser());
            return $this->responseSuccess([
                'query' => $query
            ]);
        }

        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/widget/queries/{id}", methods={"PUT"})
     * @param WidgetQuery $query
     * @param Request $request
     * @param WidgetQueryServiceInterface $widgetQueryService
     * @return JsonResponse
     */
    public function updateQuery(WidgetQuery $query, Request $request, WidgetQueryServiceInterface $widgetQueryService): JsonResponse
    {
        if ($query->getUser()->getId() != $this->getUser()->getId()) {
            throw $this->createAccessDeniedException();
        }
        $data = $request->request->all();
        $form = $this->createForm(WidgetQueryType::class, $query);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $query = $widgetQueryService->update($form->getData());
            return $this->responseSuccess([
                'query' => $query
            ]);
        }

        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/widget/queries/{id}", methods={"DELETE"})
     * @param WidgetQuery $query
     * @param WidgetQueryServiceInterface $widgetQueryService
     * @return JsonResponse
     */
    public function deleteQuery(WidgetQuery $query, WidgetQueryServiceInterface $widgetQueryService): JsonResponse
    {
        if ($query->getUser()->getId() != $this->getUser()->getId()) {
            throw $this->createAccessDeniedException();
        }
        $widgetQueryService->delete($query);
        return $this->responseSuccess();
    }
}
