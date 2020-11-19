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
        $options = [
            'columns' => array_keys($dashboard->getColumns()),
            'to' => $to,
        ];
        $data = $streamService->getLogsInRange($dashboard->getTable(), $from, $options);
        return $this->json([
            'error' => 0,
            'label' => $dashboard->getColumns(),
            'data' => $data,
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
        $summary = [];
        foreach ($dashboard->getSummaryColumns() as $column => $name) {
            $summary[$column] = $streamService->getLogSummaryInRange($dashboard->getTable(), $column, $from, $options);
        }
        return $this->json([
            'error' => 0,
            'label' => $dashboard->getSummaryColumns(),
            'data' => $summary,
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
        $label = [];
        foreach ($dashboard->getGraphColumns() as $item) {
            $label[$item['column']] = [
                'label' => $item['label'],
                'color' => $item['color'],
            ];
            $graph[$item['column']] = $streamService->getLogGraphInRange($dashboard->getTable(), $item, $from, $graphOffset, $options);
        }
        return $this->json([
            'error' => 0,
            'label' => $label,
            'data' => $graph,
        ]);
    }
}
