<?php


namespace App\Controller\Api;


use App\Constant\ErrorCodeConstant;
use App\Entity\LogView;
use App\Services\LogView\LogViewServiceInterface;
use App\Services\Stream\StreamServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StreamController extends ApiController
{
    /**
     * @Route("/api/stream/{uuid}/table", methods = "GET")
     * @param LogView|null $dashboard
     * @param LogViewServiceInterface $dashboardService
     * @return JsonResponse
     */
    public function table(?LogView $dashboard, LogViewServiceInterface $dashboardService): JsonResponse
    {
        if (is_null($dashboard)) {
            $dashboard = $dashboardService->getDefault();
            $columns = $dashboard->getColumns();
        } else {
            $columns = $dashboard->getTable()->getColumns();
        }
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
        }
        return $options;
    }

    /**
     * @Route("/api/stream/{uuid}/list", methods = "GET")
     * @param LogView|null $dashboard
     * @param Request $request
     * @param LogViewServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function list(?LogView $dashboard, Request $request, LogViewServiceInterface $dashboardService, StreamServiceInterface $streamService): JsonResponse
    {
        if (is_null($dashboard)) {
            $dashboard = $dashboardService->getDefault();
            $columns = $dashboard->getColumns();
        } else {
            $columns = $dashboard->getTable()->getColumns();
        }
        $options = $this->getFilter($request);
        $columnNames = [];
        foreach ($columns as $column) {
            $columnNames[] = $column->getName();
        }
        $options['columns'] = $columnNames;
        try {
            $data = $streamService->getLogsInRange($dashboard->getTable()->getName(), $options);
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
            'itemsCount' => count($data),
        ]);
    }

    /**
     * @Route("/api/stream/{uuid}/summary", methods = "GET")
     * @param LogView|null $dashboard
     * @param Request $request
     * @param LogViewServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function summary(?LogView $dashboard, Request $request, LogViewServiceInterface $dashboardService, StreamServiceInterface $streamService): JsonResponse
    {
        if (is_null($dashboard)) {
            $dashboard = $dashboardService->getDefault();
            $columns = $dashboard->getSummaryColumns();
        } else {
            $columns = $dashboard->getSummary();
        }
        $options = $this->getFilter($request);
        $widgets = [];
        foreach ($columns as $column) {
            try {
                $widget = [
                    'name' => $column->getName(),
                    'title' => $column->getTitle()
                ];
                $widget['data'] = $streamService->getLogSummaryInRange($dashboard->getTable()->getName(), $widget['name'], $options);
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
     * @param LogView|null $dashboard
     * @param Request $request
     * @param LogViewServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function graph(?LogView $dashboard, Request $request, LogViewServiceInterface $dashboardService, StreamServiceInterface $streamService): JsonResponse
    {
        $dashboard = $dashboardService->getDefault();
        $options = $this->getFilter($request);
        $graph = [];
        $graphOffset = $dashboard->getGraphFixedOffset();
        if (is_null($graphOffset)) {
            $graphOffset = $streamService->getGraphOffsetInSeconds($options['from'], $options['to'] ?? new \DateTime(), $dashboard->getGraphNumberOfPoint());
        }
        foreach ($dashboard->getGraphColumns() as $item) {
            try {
                $line = [
                    'label' => $item['title'],
                    'color' => $item['color'],
                    'data' => $streamService->getLogGraphInRange($dashboard->getTable()->getName(), $item, $graphOffset, $options),
                ];
                $graph[] = $line;
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
            'data' => $graph,
        ]);
    }
}
