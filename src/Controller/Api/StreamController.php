<?php


namespace App\Controller\Api;


use App\Constant\ErrorCodeConstant;
use App\Entity\Dashboard;
use App\Entity\LogView;
use App\Entity\Widget;
use App\Helper\ColumnHelper;
use App\Helper\StringHelper;
use App\Services\Dashboard\DashboardServiceInterface;
use App\Services\Database\DatabaseServiceInterface;
use App\Services\LogView\LogViewServiceInterface;
use App\Services\Stream\StreamServiceInterface;
use App\Services\Widget\WidgetIterationInterface;
use App\Services\Widget\WidgetServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;

class StreamController extends ApiController
{
    /**
     * @Route("/api/stream/{uuid}/table", methods = "GET")
     * @param LogView|null $logView
     * @param LogViewServiceInterface $logViewService
     * @return JsonResponse
     */
    public function table(?LogView $logView, LogViewServiceInterface $logViewService): JsonResponse
    {
        if (is_null($logView)) {
            $logView = $logViewService->getDefault();
        }
        $columns = $logViewService->getVisibleColumns($logView);
        return $this->responseSuccess([
            'data' => $columns
        ]);
    }

    private function getFilter(Request $request): array
    {
        $options = [];
        if ($request->query->has('from')) {
            $from = $request->query->get('from');
            if (is_numeric($from)) {
                $from = new \DateTime("- {$from} minutes");
            } else {
                $from = new \DateTime($from);
            }
            $options['from'] = $from;
        } else {
            $options['from'] = new \DateTime('- 1 hour');
        }
        if ($request->query->has('to')) {
            $to = $request->query->get('to');
            $to = new \DateTime($to);
            $options['to'] = $to;
        }
        if ($request->query->has('filter')) {
            $filter = $request->query->get('filter');
            $options['filter'] = $filter;
        } else {
            $options['filter'] = false;
        }
        if ($request->query->has('pageIndex')) {
            $options['page'] = intval($request->query->get('pageIndex'));
        }
        if ($request->query->has('pageSize')) {
            $options['limit'] = intval($request->query->get('pageSize'));
        }
        return $options;
    }

    /**
     * @Route("/api/stream/{uuid}/list", methods = "GET")
     * @param LogView|null $logView
     * @param Request $request
     * @param LogViewServiceInterface $logViewService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     * @throws \Exception
     */
    public function list(
        ?LogView $logView,
        Request $request,
        LogViewServiceInterface $logViewService,
        StreamServiceInterface $streamService
    ): JsonResponse {
        if (is_null($logView)) {
            $logView = $logViewService->getDefault();

        }
        $options = $this->getFilter($request);
        $columns = $logView->getLogViewColumns();
        if (!empty($columns)) {
            $options['columns'] = $columns;
        }
        try {
            $trackId = StringHelper::random();
            $options['trackId'] = $trackId;
            $total = $streamService->getTotalLogsInRange($logView->getTable(), $options);
            $options['total'] = $total;
            $data = $streamService->getLogsInRange($logView->getTable(), $options);
            $log = $streamService->getLogByTrackId($trackId);
            $queryInfo = [];
            if ($log) {
                $queryInfo = [
                    'queryTime' => $log['query_duration_ms'],
                    'queryMemory' => $log['memory_usage'],
                    'queryReadRows' => $log['read_rows'],
                    'queryReadBytes' => $log['read_bytes'],
                    'queryResultBytes' => $log['result_bytes'],
                ];
            }
        } catch (Exception $e) {
            return $this->responseError([
                'error' => ErrorCodeConstant::ERROR_INVALID_QUERY,
                'data' => [],
                'message' => 'Invalid SQL query',
                'filter' => $options['filter'],
            ]);
        }
        return $this->responseSuccess([
            'data' => $data,
            'itemsCount' => $total,
            'queryInfo' => $queryInfo,
        ]);
    }

    /**
     * @Route("/api/stream/{uuid}/summary", methods = "GET")
     * @param LogView|null $logView
     * @param Request $request
     * @param LogViewServiceInterface $logViewService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */

    public function summary(
        ?LogView $logView,
        Request $request,
        LogViewServiceInterface $logViewService,
        StreamServiceInterface $streamService
    ): JsonResponse {
        if (is_null($logView)) {
            $logView = $logViewService->getDefault();
        }
        $columns = $logView->getSummary();
        $options = $this->getFilter($request);
        $widgets = [];
        foreach ($columns as $column) {
            try {
                $widget = [
                    'name' => $column,
                    'title' => ColumnHelper::titleFromName($column)
                ];
                $widget['data'] = $streamService->getLogSummaryInRange($logView->getTable(), $widget['name'], $options);
                $widgets[] = $widget;
            } catch (Exception $e) {
                return $this->responseError([
                    'error' => ErrorCodeConstant::ERROR_INVALID_QUERY,
                    'data' => [],
                    'message' => 'Invalid SQL query',
                    'filter' => $options['filter'],
                ]);
            }
        }
        return $this->responseSuccess([
            'data' => $widgets,
        ]);
    }

    /**
     * @Route("/api/stream/{uuid}/graph", methods = "GET")
     * @param LogView|null $logView
     * @param Request $request
     * @param LogViewServiceInterface $logViewService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function graph(
        ?LogView $logView,
        Request $request,
        LogViewServiceInterface $logViewService,
        StreamServiceInterface $streamService
    ): JsonResponse {
        if (is_null($logView)) {
            $logView = $logViewService->getDefault();
        }
        $options = $this->getFilter($request);
        $graph = $logView->getGraph();
        $graphOffset = $streamService->getGraphOffsetInSeconds($options['from'], $options['to'] ?? new \DateTime(), $graph->getMaxPoint());
        $data = [];
        foreach ($graph->getLines() as $item) {
            try {
                $line = [
                    'label' => $item->getTitle(),
                    'color' => $item->getColor(),
                    'data' => $streamService->getLogGraphInRange($logView->getTable(), $item, $graphOffset, $options),
                ];
                $data[] = $line;
            } catch (Exception $e) {
                return $this->responseError([
                    'error' => ErrorCodeConstant::ERROR_INVALID_QUERY,
                    'data' => [],
                    'message' => 'Invalid SQL query',
                    'filter' => $options['filter'],
                ]);
            }
        }
        return $this->responseSuccess([
            'data' => $data,
        ]);
    }

    /**
     * @Route("/api/stream/dashboards", methods = "GET")
     * @param DashboardServiceInterface $dashboardService
     * @return JsonResponse
     */
    public function dashboards(DashboardServiceInterface $dashboardService): JsonResponse
    {
        return $this->responseSuccess([
            'data' => $dashboardService->getDashboards()
        ]);
    }

    /**
     * @Route("/api/stream/dashboard/{uuid}", methods = "GET")
     * @param Dashboard $dashboard
     * @param WidgetIterationInterface $widgetIteration
     * @return JsonResponse
     */
    public function dashboard(Dashboard $dashboard, WidgetIterationInterface $widgetIteration): JsonResponse
    {
        $sizeConfigs = [];
        foreach ($widgetIteration->getWidgets() as $widget) {
            $sizeConfigs[$widget->getType()] = [
                'minWidth' => $widget->getMinWidth(),
                'minHeight' => $widget->getMinHeight(),
            ];
        }
        return $this->responseSuccess([
            'data' => $dashboard,
            'widgets' => $dashboard->getDashboardWidgets()->toArray(),
            'configs' => ['size' => $sizeConfigs],
        ]);
    }

    /**
     * @Route("/api/stream/widget/{uuid}/{widget_id}", methods = "GET")
     * @param Request $request
     * @param Dashboard $dashboard
     * @param Widget $widget
     * @param WidgetServiceInterface $widgetService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     * @Entity("widget", expr="repository.find(widget_id)")
     */
    public function widget(Request $request, Dashboard $dashboard, Widget $widget, WidgetServiceInterface $widgetService, StreamServiceInterface $streamService): JsonResponse
    {
        // this is public API so uuid just used to prevent scan by widget_id
        $isOK = false;
        foreach ($widget->getDashboardWidgets() as $dashboardWidget) {
            if ($dashboardWidget->getDashboard()->getId() === $dashboard->getId()) {
                $isOK = true;
                break;
            }
        }
        if (!$isOK) {
            return $this->responseError('Widget does not belong to dashboard');
        }
        $options = $this->getFilter($request);
        $widgetItem = $widgetService->getWidgetInterface($widget);
        $data = $streamService->getWidgetData($dashboard, $widgetItem, $options);

        return $this->responseSuccess([
            'data' => $data,
        ]);
    }
}
