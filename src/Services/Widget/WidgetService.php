<?php


namespace App\Services\Widget;


use App\Entity\Widget;
use App\Repository\WidgetRepository;
use App\Widget\WidgetInterface;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;

class WidgetService implements WidgetServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var WidgetIterationInterface */
    private $widgetIteration;

    public function __construct(EntityManagerInterface $em, WidgetIterationInterface $widgetIteration)
    {
        $this->em = $em;
        $this->widgetIteration = $widgetIteration;
    }

    /**
     * @return WidgetRepository
     */
    private function getRepository(): ObjectRepository
    {
        return $this->em->getRepository(Widget::class);
    }

    /**
     * @inheritDoc
     */
    public function createWidget(Widget $widget): Widget
    {
        $this->em->persist($widget);
        $this->em->flush();
        return $widget;
    }

    /**
     * @inheritDoc
     */
    public function updateWidget(Widget $widget): Widget
    {
        $this->em->persist($widget);
        $this->em->flush();
        return $widget;
    }

    /**
     * @inheritDoc
     */
    public function getWidgets(array $options = []): array
    {
        return $this->getRepository()->findAll();
    }

    /**
     * @inheritDoc
     */
    public function getWidgetIds(array $options = []): array
    {
        return $this->getRepository()->getAllId($options);
    }

    /**
     * @inheritDoc
     */
    public function delete(Widget $widget)
    {
        foreach ($widget->getDashboardWidgets() as $dashboardWidget) {
            $this->em->remove($dashboardWidget);
        }
        $this->em->remove($widget);
        $this->em->flush();
    }

    /**
     * @inheritDoc
     */
    public function getWidgetInterface(Widget $entity): WidgetInterface
    {
        return $this->widgetIteration->getWidgetFromEntity($entity);
    }

    /**
     * @inheritDoc
     */
    public function checkWidgetIdSameTable(array $ids): bool
    {
        if (count($ids) === 1) {
            return true;
        }
        return $this->getRepository()->checkWidgetIdSameTable($ids);
    }

    /**
     * @inheritDoc
     */
    public function getAllByIds(array $ids): array
    {
        return $this->getRepository()->getAllByIds($ids);
    }
}
