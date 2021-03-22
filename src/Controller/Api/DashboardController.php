<?php


namespace App\Controller\Api;


use App\Entity\Dashboard;
use App\Entity\Widget;
use App\Form\DashboardType;
use App\Form\DashboardWidgetType;
use App\Services\Dashboard\DashboardServiceInterface;
use App\Services\Widget\WidgetServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;

class DashboardController extends ApiController
{
    /**
     * @Route("/api/dashboard", methods = "GET")
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @return JsonResponse
     */
    public function list(Request $request, DashboardServiceInterface $dashboardService): JsonResponse
    {
        $data = $dashboardService->getDashboards($request->query->all());
        return $this->responseSuccess([
            'data' => $data,
        ]);
    }

    /**
     * @Route("/api/dashboard/{id}", methods = "GET")
     * @param Dashboard $dashboard
     * @return JsonResponse
     */
    public function dashboard(Dashboard $dashboard): JsonResponse
    {
        $widgets = [];
        foreach ($dashboard->getDashboardWidgets() as $dashboardWidget) {
            $widgets[] = $dashboardWidget->getWidget();
        }
        return $this->responseSuccess([
            'data' => $dashboard,
            'widgets' => $widgets,
        ]);
    }

    /**
     * @Route("/api/dashboard/create", methods = "POST")
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param WidgetServiceInterface $widgetService
     * @param UrlGeneratorInterface $urlGenerator
     * @return JsonResponse
     */
    public function create(
        Request $request,
        DashboardServiceInterface $dashboardService,
        WidgetServiceInterface $widgetService,
        UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(DashboardType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $dashboard = $form->getData();
            $widgetIds = $form->get('widgets')->getData();
            $widgets = $widgetService->getAllByIds($widgetIds);
            $dashboard = $dashboardService->createDashboard($dashboard, $widgets);

            return $this->responseSuccess([
                'redirect' => $urlGenerator->generate('dashboard_edit', ['id' => $dashboard->getId()]),
                'id' => $dashboard->getId(),
            ]);
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/dashboard/{id}", methods = "PUT")
     * @param Dashboard $dashboard
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param WidgetServiceInterface $widgetService
     * @return JsonResponse
     */
    public function update(Dashboard $dashboard, Request $request, DashboardServiceInterface $dashboardService, WidgetServiceInterface $widgetService): JsonResponse
    {
        $data = $request->request->all();
        $form = $this->createForm(DashboardType::class, $dashboard);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $dashboard = $form->getData();
            $widgetIds = $form->get('widgets')->getData();
            $widgets = $widgetService->getAllByIds($widgetIds);
            $dashboardService->updateDashboard($dashboard, $widgets);

            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/dashboard/{id}", methods = "DELETE")
     * @param Dashboard $dashboard
     * @param DashboardServiceInterface $dashboardService
     * @return JsonResponse
     */
    public function delete(Dashboard $dashboard, DashboardServiceInterface $dashboardService): JsonResponse
    {
        $dashboardService->delete($dashboard);
        return $this->responseSuccess();
    }

    /**
     * @Route("/api/dashboard/{id}/add/{widget_id}", methods = "POST")
     * @param Dashboard $dashboard
     * @param Widget $widget
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @return JsonResponse
     * @Entity("widget", expr="repository.find(widget_id)")
     */
    public function addWidget(Dashboard $dashboard, Widget $widget, Request $request, DashboardServiceInterface $dashboardService): JsonResponse
    {
        foreach ($widget->getDashboardWidgets() as $dashboardWidget) {
            if ($dashboardWidget->getDashboard()->getId() === $dashboard->getId()) {
                return $this->responseSuccess();
            }
        }

        $data = $request->request->all();
        $form = $this->createForm(DashboardWidgetType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $dashboardWidget = $form->getData();
            $dashboardService->addWidget($dashboardWidget, $dashboard, $widget);

            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/dashboard/{id}/update/{widget_id}", methods = "PUT")
     * @param Dashboard $dashboard
     * @param Widget $widget
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @return JsonResponse
     * @Entity("widget", expr="repository.find(widget_id)")
     */
    public function updateWidget(Dashboard $dashboard, Widget $widget, Request $request, DashboardServiceInterface $dashboardService): JsonResponse
    {
        $dashboardWidget = $dashboardService->findDashboardWidget($dashboard, $widget);
        if (empty($dashboardWidget)) {
            return $this->responseError('Invalid data');
        }

        $data = $request->request->all();
        $form = $this->createForm(DashboardWidgetType::class, $dashboardWidget);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $dashboardWidget = $form->getData();
            $dashboardService->updateDashboardWidget($dashboardWidget);

            return $this->responseSuccess();
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/dashboard/{id}/remove/{widget_id}", methods = "DELETE")
     * @param Dashboard $dashboard
     * @param Widget $widget
     * @param DashboardServiceInterface $dashboardService
     * @return JsonResponse
     * @Entity("widget", expr="repository.find(widget_id)")
     */
    public function removeDashboardWidget(Dashboard $dashboard, Widget $widget, DashboardServiceInterface $dashboardService): JsonResponse
    {
        $dashboardService->removeWidget($dashboard, $widget);
        return $this->responseSuccess();
    }
}
