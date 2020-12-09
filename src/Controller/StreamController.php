<?php


namespace App\Controller;


use App\Constant\ErrorCodeConstant;
use App\Entity\Dashboard;
use App\Services\Dashboard\DashboardServiceInterface;
use App\Services\Stream\StreamServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StreamController extends AbstractController
{
    /**
     * @Route("/stream/{uuid}/table", name="stream_table")
     * @param Dashboard|null $dashboard
     * @param DashboardServiceInterface $dashboardService
     * @return JsonResponse
     */
    public function table(?Dashboard $dashboard, DashboardServiceInterface $dashboardService): JsonResponse
    {
        if (is_null($dashboard)) {
            $dashboard = $dashboardService->getDefault();
            $columns = $dashboard->getColumns();
        } else {
            $columns = $dashboard->getTable()->getColumns();
        }
        return $this->json([
            'error' => 0,
            'data' => $columns,
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
     * @Route("/stream/{uuid}/list", name="stream_list")
     * @param Dashboard|null $dashboard
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function list(?Dashboard $dashboard, Request $request, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService): JsonResponse
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
            return $this->json([
                'error' => ErrorCodeConstant::ERROR_INVALID_QUERY,
                'data' => [],
                'message' => 'Invalid SQL query',
                'filter' => $options['filter'],
            ]);
        }
        return $this->json([
            'error' => 0,
            'data' => $data,
            'itemsCount' => count($data),
        ]);
    }

    /**
     * @Route("/stream/{uuid}/summary", name="stream_summary")
     * @param Dashboard|null $dashboard
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function summary(?Dashboard $dashboard, Request $request, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService): JsonResponse
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
                return $this->json([
                    'error' => ErrorCodeConstant::ERROR_INVALID_QUERY,
                    'data' => [],
                    'message' => 'Invalid SQL query',
                    'filter' => $options['filter'],
                ]);
            }
        }
        return $this->json([
            'error' => 0,
            'data' => $widgets,
        ]);
    }

    /**
     * @Route("/stream/{uuid}/graph", name="stream_graph")
     * @param Dashboard|null $dashboard
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function graph(?Dashboard $dashboard, Request $request, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService): JsonResponse
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
                return $this->json([
                    'error' => ErrorCodeConstant::ERROR_INVALID_QUERY,
                    'data' => [],
                    'message' => 'Invalid SQL query',
                    'filter' => $options['filter'],
                ]);
            }
        }
        return $this->json([
            'error' => 0,
            'data' => $graph,
        ]);
    }
}
