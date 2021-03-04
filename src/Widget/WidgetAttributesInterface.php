<?php


namespace App\Widget;


interface WidgetAttributesInterface
{
    public function getTitle(): ?string;

    public function getTable(): ?string;

    public function getColumn(): ?string;

    public function isOrderDesc(): ?bool;

    public function getSize(): ?int;
}
