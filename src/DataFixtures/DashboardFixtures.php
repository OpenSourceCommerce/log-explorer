<?php

namespace App\DataFixtures;

use App\Entity\Dashboard;
use App\Entity\DashboardWidget;
use App\Entity\Widget;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class DashboardFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $widget1 = $this->getReference(Widget::class.'_number');
        $widget2 = $this->getReference(Widget::class.'_pie');
        $widget3 = $this->getReference(Widget::class.'_doughnut');
        $widget4 = $this->getReference(Widget::class.'_table');

        $entity = new Dashboard();
        $entity->setTitle('Dashboard 1');
        $manager->persist($entity);

        $dashboardWidget = new DashboardWidget();
        $dashboardWidget->setDashboard($entity);
        $dashboardWidget->setWidget($widget1);
        $dashboardWidget->setX(1);
        $dashboardWidget->setY(1);
        $dashboardWidget->setWidth(4);
        $dashboardWidget->setHeight(4);
        $dashboardWidget->setFixed(false);
        $manager->persist($dashboardWidget);

        $dashboardWidget = new DashboardWidget();
        $dashboardWidget->setDashboard($entity);
        $dashboardWidget->setWidget($widget2);
        $dashboardWidget->setX(1);
        $dashboardWidget->setY(1);
        $dashboardWidget->setWidth(4);
        $dashboardWidget->setHeight(4);
        $dashboardWidget->setFixed(false);
        $manager->persist($dashboardWidget);

        $dashboardWidget = new DashboardWidget();
        $dashboardWidget->setDashboard($entity);
        $dashboardWidget->setWidget($widget4);
        $dashboardWidget->setX(1);
        $dashboardWidget->setY(1);
        $dashboardWidget->setWidth(4);
        $dashboardWidget->setHeight(4);
        $dashboardWidget->setFixed(false);
        $manager->persist($dashboardWidget);


        $entity = new Dashboard();
        $entity->setTitle('Dashboard 2');
        $manager->persist($entity);

        $dashboardWidget = new DashboardWidget();
        $dashboardWidget->setDashboard($entity);
        $dashboardWidget->setWidget($widget3);
        $dashboardWidget->setX(1);
        $dashboardWidget->setY(1);
        $dashboardWidget->setWidth(4);
        $dashboardWidget->setHeight(4);
        $dashboardWidget->setFixed(false);
        $manager->persist($dashboardWidget);

        $dashboardWidget = new DashboardWidget();
        $dashboardWidget->setDashboard($entity);
        $dashboardWidget->setWidget($widget4);
        $dashboardWidget->setX(1);
        $dashboardWidget->setY(1);
        $dashboardWidget->setWidth(4);
        $dashboardWidget->setHeight(4);
        $dashboardWidget->setFixed(false);
        $manager->persist($dashboardWidget);

        $manager->flush();
    }

    /**
     * @inheritDoc
     */
    public function getDependencies()
    {
        return [
            WidgetFixtures::class,
        ];
    }
}
