<?php

namespace App\Services\Export;

use App\Entity\Dashboard;
use App\Entity\DashboardWidget;
use App\Entity\Widget;
use App\Services\Dashboard\DashboardServiceInterface;
use App\Services\Widget\WidgetServiceInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class DashboardExportImportService implements DashboardExportImportServiceInterface
{
    const name = 'Export dashboard';

    /** @var Widget[] */
    private $widgets = [];
    /** @var Dashboard[] */
    private $dashboards = [];

    /**
     * @var WidgetServiceInterface
     */
    private $widgetService;
    /**
     * @var DashboardServiceInterface
     */
    private $dashboardService;
    /**
     * @var ParameterBagInterface
     */
    private $parameterBag;
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @param EntityManagerInterface $em
     * @param ParameterBagInterface $parameterBag
     * @param WidgetServiceInterface $widgetService
     * @param DashboardServiceInterface $dashboardService
     */
    public function __construct(
        EntityManagerInterface $em,
        ParameterBagInterface $parameterBag,
        WidgetServiceInterface $widgetService,
        DashboardServiceInterface $dashboardService
    ) {
        $this->em = $em;
        $this->parameterBag = $parameterBag;
        $this->widgetService = $widgetService;
        $this->dashboardService = $dashboardService;
    }

    private function toJson(): string
    {
        $data = [
            'name' => self::name,
            'date' => date('Y-m-d H:i:s'),
            'version' => $this->parameterBag->get('app.version'),
            'widgets' => $this->widgets,
            'dashboards' => $this->dashboards,
        ];
        return json_encode($data);
    }

    /**
     * @inheritDoc
     */
    public function exportWidget(?array $ids): string
    {
        if (is_null($ids)) {
            $entities = $this->widgetService->getAll();
        } else {
            $entities = $this->widgetService->getAllByIds($ids);
        }

        foreach ($entities as $entity) {
            $this->widgets[$entity->getId()] = $entity->jsonSerialize(true);
            unset($this->widgets[$entity->getId()]['last_updated']);
        }

        return $this->toJson();
    }

    /**
     * @inheritDoc
     */
    public function exportDashboard(?array $ids): string
    {
        if (is_null($ids)) {
            $entities = $this->dashboardService->getAll();
        } else {
            $entities = $this->dashboardService->getAllByIds($ids);
        }

        foreach ($entities as $entity) {
            $dashboard = $entity->jsonSerialize();
            unset($dashboard['last_updated']);
            $dashboard['widgets'] = [];
            foreach ($entity->getDashboardWidgets() as $dashboardWidget) {
                $dashboard['widgets'][] = $dashboardWidget->jsonSerialize();
                if (!isset($this->widgets[$dashboardWidget->getWidget()->getId()])) {
                    $this->widgets[$dashboardWidget->getWidget()->getId()] = $dashboardWidget->getWidget()->jsonSerialize(true);
                }
            }
            $this->dashboards[] = $dashboard;
        }

        return $this->toJson();
    }

    /**
     * @inheritDoc
     */
    public function import(array $data)
    {
        foreach ($data['widgets'] as $widget) {
            $entity = new Widget();
            $entity->setType($widget['type']);
            $entity->setColumn($widget['column']);
            $entity->setIsOrderDesc($widget['order_desc']);
            $entity->setQuery($widget['query']);
            $entity->setSize($widget['size']);
            $entity->setTable($widget['table']);
            $entity->setTitle($widget['title']);

            $this->em->persist($entity);

            $this->widgets[$widget['id']] = $entity->jsonSerialize(true);
        }
        foreach ($data['dashboards'] as $dashboard) {
            $entity = new Dashboard();
            $entity->setQuery($dashboard['query']);
            $entity->setTitle($dashboard['title']);
            $this->em->persist($entity);

            foreach ($dashboard['widgets'] as $info) {
                $dashboardWidget = new DashboardWidget();
                $dashboardWidget->setFixed($info['fixed']);
                $dashboardWidget->setHeight($info['height']);
                $dashboardWidget->setWidth($info['width']);
                $dashboardWidget->setX($info['x']);
                $dashboardWidget->setY($info['y']);
                $dashboardWidget->setDashboard($entity);
                $dashboardWidget->setWidget($this->widgets[$info['widget_id']]);
                $this->em->persist($dashboardWidget);
            }
        }
        $this->em->flush();
    }

    /**
     * @inheritDoc
     */
    public function exportAll(): string
    {
        $this->exportAllWidget();
        return $this->exportAllDashboard();
    }

    /**
     * @inheritDoc
     */
    public function exportAllDashboard(): string
    {
        return $this->exportDashboard(null);
    }

    /**
     * @inheritDoc
     */
    public function exportAllWidget(): string
    {
        return $this->exportWidget(null);
    }
}
