<?php

namespace App\DataFixtures;

use App\Constant\WidgetConstant;
use App\Entity\Widget;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class WidgetFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $entity = new Widget();
        $entity->setTitle('Number OK');
        $entity->setTable('nginx_access');
        $entity->setColumn('status');
        $entity->setQuery('status < 300');
        $entity->setIsOrderDesc(true);
        $entity->setType(WidgetConstant::TYPE_COUNTER);
        $manager->persist($entity);
        $this->addReference(Widget::class.'_number', $entity);

        $entity = new Widget();
        $entity->setTitle('Status OK');
        $entity->setTable('nginx_access');
        $entity->setColumn('status');
        $entity->setQuery('status < 300');
        $entity->setIsOrderDesc(true);
        $entity->setType(WidgetConstant::TYPE_PIE_CHART);
        $manager->persist($entity);
        $this->addReference(Widget::class.'_pie', $entity);

        $entity = new Widget();
        $entity->setTitle('Status OK 2');
        $entity->setTable('nginx_access');
        $entity->setColumn('status');
        $entity->setQuery('status < 300');
        $entity->setIsOrderDesc(true);
        $entity->setType(WidgetConstant::TYPE_DOUGHNUT);
        $manager->persist($entity);
        $this->addReference(Widget::class.'_doughnut', $entity);

        $entity = new Widget();
        $entity->setTitle('Status ERROR');
        $entity->setTable('nginx_access');
        $entity->setColumn('status,url');
        $entity->setQuery('status >= 400');
        $entity->setIsOrderDesc(true);
        $entity->setType(WidgetConstant::TYPE_TABLE);
        $manager->persist($entity);
        $this->addReference(Widget::class.'_table', $entity);

        $manager->flush();
    }
}
