<?php


namespace App\Controller;


use App\Services\Dashboard\DashboardServiceInterface;
use App\Services\Stream\StreamServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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

    /**
     * @Route("/stream/{uuid}/list", name="stream_list")
     * @param $uuid
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function list($uuid, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService)
    {
        $dashboard = $dashboardService->fromUuid($uuid);
        $from = new \DateTime('2020-06-01 00:02:47');
        $to = new \DateTime('2020-06-01 01:02:47');
        $columns = $dashboard->getColumns();
        $options = [
            'columns' => array_column($columns, 'name'),
            'to' => $to,
        ];
        $data = $streamService->getLogsInRange($dashboard->getTable(), $from, $options);
        return $this->json([
            'error' => 0,
            'data' => $data,
            'itemsCount' => count($data),
        ]);
    }

    /**
     * @Route("/stream/{uuid}/summary", name="stream_summary")
     * @param $uuid
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function summary($uuid, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService)
    {
        $dashboard = $dashboardService->fromUuid($uuid);
        $from = new \DateTime('2020-06-01 00:02:47');
        $to = new \DateTime('2020-06-01 01:02:47');
        $options = [
            'to' => $to,
        ];
        $widgets = $dashboard->getSummaryColumns();
        foreach ($widgets as &$widget) {
            $widget['data'] = $streamService->getLogSummaryInRange($dashboard->getTable(), $widget['name'], $from, $options);
        }
        return $this->json([
            'error' => 0,
            'data' => $widgets,
        ]);
    }

    /**
     * @Route("/stream/{uuid}/graph", name="stream_graph")
     * @param $uuid
     * @param DashboardServiceInterface $dashboardService
     * @param StreamServiceInterface $streamService
     * @return JsonResponse
     */
    public function graph($uuid, DashboardServiceInterface $dashboardService, StreamServiceInterface $streamService)
    {
        $dashboard = $dashboardService->fromUuid($uuid);
        $from = new \DateTime('2020-06-01 00:02:47');
        $to = new \DateTime('2020-06-01 01:02:47');
        $options = [
            'to' => $to,
        ];
        $graph = [];
        $graphOffset = $dashboard->getGraphFixedOffset();
        if (is_null($graphOffset)) {
            $graphOffset = $streamService->getGraphOffsetInSeconds($from, $to, $dashboard->getGraphNumberOfPoint());
        }
        foreach ($dashboard->getGraphColumns() as $item) {
            $line = [
                'label' => $item['title'],
                'color' => $item['color'],
                'data' => $streamService->getLogGraphInRange($dashboard->getTable(), $item, $from, $graphOffset, $options),
            ];
            $graph[] = $line;
        }
        return $this->json([
            'error' => 0,
            'data' => $graph,
        ]);
    }
}
