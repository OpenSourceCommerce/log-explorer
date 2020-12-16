<?php


namespace App\Services\LogView;


use App\Entity\Graph;
use App\Entity\LogView;
use App\Entity\DemoDashboard;
use App\Entity\Table;

interface LogViewServiceInterface
{
    /**
     * @return DemoDashboard
     */
    public function getDefault(): DemoDashboard;

    /**
     * @param Table $table
     * @param Graph $graph
     * @param string|null $name
     * @param bool $flush
     * @return mixed
     */
    public function createLogView(Table $table, Graph $graph, ?string $name, bool $flush = true): LogView;

    /**
     * @param LogView $logView
     * @param array $columns
     */
    public function setSummary(LogView $logView, array $columns);
}
