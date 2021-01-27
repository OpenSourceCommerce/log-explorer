<?php


namespace App\Services\Widget;


use App\Entity\Widget;
use App\Exceptions\BadSqlException;
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
    public function createWidget(WidgetInterface $data): Widget
    {
        $data->isValid();
        $widget = new Widget();
        $widget->setTitle($data->getTitle());
        $widget->setType($data->getType());
        $widget->setQuery($data->getQuery());
        $this->em->persist($widget);
        $this->em->flush();
        return $widget;
    }

    /**
     * @inheritDoc
     */
    public function updateWidget(Widget $widget, WidgetInterface $data): Widget
    {
        $data->isValid();
        $widget->setTitle($data->getTitle());
        $widget->setQuery($data->getQuery());
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
    public function delete(Widget $widget)
    {
        $this->em->remove($widget);
        $this->em->flush();
    }
}
