<?php


namespace App\Controller;


use App\Constant\ErrorCodeConstant;
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
     * @param $uuid
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function table($uuid, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService)
    {
        $dashboard = $dashboardService->fromUuid($uuid);
        $columns = $dashboard->getColumns();
        return $this->json([
            'error' => 0,
            'data' => $columns,
        ]);
    }

    private function getFilter(Request $request)
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
     * @param $uuid
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     * @throws \Exception
     */
    public function list($uuid, Request $request, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService)
    {
        $dashboard = $dashboardService->fromUuid($uuid);
        $options = $this->getFilter($request);
        $columns = $dashboard->getColumns();
        $options['columns'] = array_column($columns, 'name');
        try {
            $data = $streamService->getLogsInRange($dashboard->getTable(), $options);
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
     * @param $uuid
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function summary($uuid, Request $request, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService)
    {
        $dashboard = $dashboardService->fromUuid($uuid);
        $options = $this->getFilter($request);
        $widgets = $dashboard->getSummaryColumns();
        foreach ($widgets as &$widget) {
            try {
                $widget['data'] = $streamService->getLogSummaryInRange($dashboard->getTable(), $widget['name'], $options);
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
     * @param $uuid
     * @param Request $request
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function graph($uuid, Request $request, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService)
    {
        $dashboard = $dashboardService->fromUuid($uuid);
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
                    'data' => $streamService->getLogGraphInRange($dashboard->getTable(), $item, $graphOffset, $options),
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
