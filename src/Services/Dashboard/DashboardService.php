<?php


namespace App\Services\Dashboard;


use App\Entity\Dashboard;
use App\Entity\DashboardWidget;
use App\Entity\Widget;
use App\Repository\DashboardRepository;
use App\Repository\DashboardWidgetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;

class DashboardService implements DashboardServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @return DashboardRepository
     */
    private function getRepository(): ObjectRepository
    {
        return $this->em->getRepository(Dashboard::class);
    }

    /**
     * @return DashboardWidgetRepository
     */
    private function getDashboardWidgetRepository(): ObjectRepository
    {
        return $this->em->getRepository(DashboardWidget::class);
    }

    /**
     * @inheritDoc
     */
    public function createDashboard(Dashboard $dashboard): Dashboard
    {
        $this->em->persist($dashboard);
        $this->em->flush();
        return $dashboard;
    }

    /**
     * @inheritDoc
     */
    public function updateDashboard(Dashboard $dashboard): Dashboard
    {
        $this->em->persist($dashboard);
        $this->em->flush();
        return $dashboard;
    }

    /**
     * @inheritDoc
     */
    public function getDashboards(array $options = []): array
    {
        return $this->getRepository()->findAll();
    }

    /**
     * @inheritDoc
     */
    public function delete(Dashboard $dashboard)
    {
        foreach ($dashboard->getDashboardWidgets() as $dashboardWidget) {
            $this->em->remove($dashboardWidget);
        }
        $this->em->remove($dashboard);
        $this->em->flush();
    }

    /**
     * @param Dashboard $dashboard
     * @param Widget $widget
     * @return DashboardWidget
     */
    public function findDashboardWidget(Dashboard $dashboard, Widget $widget): DashboardWidget
    {
        return $this->getDashboardWidgetRepository()->findOneBy([
            'dashboard' => $dashboard,
            'widget' => $widget,
        ]);
    }

    /**
     * @inheritDoc
     */
    public function addWidget(DashboardWidget $dashboardWidget, Dashboard $dashboard, Widget $widget): DashboardWidget
    {
        $dashboardWidget->setDashboard($dashboard);
        $dashboardWidget->setWidget($widget);
        $this->em->persist($dashboardWidget);
        $this->em->flush();
        return $dashboardWidget;
    }

    /**
     * @inheritDoc
     */
    public function updateDashboardWidget(DashboardWidget $dashboardWidget): DashboardWidget
    {
        $this->em->persist($dashboardWidget);
        $this->em->flush();
        return $dashboardWidget;
    }

    /**
     * @inheritDoc
     */
    public function removeWidget(Dashboard $dashboard, Widget $widget)
    {
        $dashboardWidget = $this->findDashboardWidget($dashboard, $widget);
        if (empty($dashboardWidget)) {
            return;
        }
        $this->em->remove($dashboardWidget);
        $this->em->flush();
    }
}
