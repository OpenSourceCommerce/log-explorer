<?php


namespace App\Services\Widget;


use App\Entity\Dashboard;
use App\Entity\Widget;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use App\Exceptions\NoDataException;
use App\Widget\WidgetInterface;
use Doctrine\DBAL\Query\QueryBuilder;

interface WidgetServiceInterface
{
    /**
     * @param array $options
     * @return array|Widget[]
     */
    public function getWidgets(array $options = []): array;

    /**
     * @param Widget $widget
     * @return Widget
     */
    public function createWidget(Widget $widget): Widget;

    /**
     * @param Widget $widget
     * @return Widget
     */
    public function updateWidget(Widget $widget): Widget;

    /**
     * @param Widget $widget
     */
    public function delete(Widget $widget);

    /**
     * @param Widget $entity
     * @return mixed
     */
    public function getWidgetInterface(Widget $entity): WidgetInterface;
}
