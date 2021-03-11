<?php


namespace App\Services\Dashboard;


use App\Entity\Dashboard;
use App\Entity\DashboardWidget;
use App\Entity\Widget;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use Doctrine\DBAL\Query\QueryBuilder;

interface DashboardServiceInterface
{
    /**
     * @param Dashboard $dashboard
     * @param Widget[]|array $widgets
     * @return Dashboard
     */
    public function createDashboard(Dashboard $dashboard, array $widgets = []): Dashboard;

    /**
     * @param Dashboard $dashboard
     * @return Dashboard
     */
    public function updateDashboard(Dashboard $dashboard): Dashboard;

    /**
     * @param array $options
     * @return Dashboard[]|array
     */
    public function getDashboards(array $options = []): array;

    /**
     * @param Dashboard $dashboard
     */
    public function delete(Dashboard $dashboard);

    /**
     * @param Dashboard $dashboard
     * @param Widget $widget
     * @return DashboardWidget
     */
    public function findDashboardWidget(Dashboard $dashboard, Widget $widget): DashboardWidget;

    /**
     * @param DashboardWidget $dashboardWidget
     * @param Dashboard $dashboard
     * @param Widget $widget
     * @return DashboardWidget
     */
    public function addWidget(DashboardWidget $dashboardWidget, Dashboard $dashboard, Widget $widget): DashboardWidget;

    /**
     * @param DashboardWidget $dashboardWidget
     * @return DashboardWidget
     */
    public function updateDashboardWidget(DashboardWidget $dashboardWidget): DashboardWidget;

    /**
     * @param Dashboard $dashboard
     * @param Widget $widget
     */
    public function removeWidget(Dashboard $dashboard, Widget $widget);

    /**
     *
     */
    public function getDefaultDashboard(): ?Dashboard;
}
