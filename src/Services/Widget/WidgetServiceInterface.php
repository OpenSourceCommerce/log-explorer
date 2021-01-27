<?php


namespace App\Services\Widget;


use App\Entity\Widget;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use App\Widget\WidgetInterface;

interface WidgetServiceInterface
{
    /**
     * @param array $options
     * @return array|Widget[]
     */
    public function getWidgets(array $options = []): array;

    /**
     * @param WidgetInterface $data
     * @return Widget
     * @throws ActionDeniedException
     * @throws BadSqlException
     */
    public function createWidget(WidgetInterface $data): Widget;

    /**
     * @param Widget $widget
     * @param WidgetInterface $data
     * @return Widget
     * @throws ActionDeniedException
     * @throws BadSqlException
     */
    public function updateWidget(Widget $widget, WidgetInterface $data): Widget;

    /**
     * @param Widget $widget
     */
    public function delete(Widget $widget);
}
