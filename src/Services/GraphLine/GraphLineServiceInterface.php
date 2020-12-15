<?php


namespace App\Services\GraphLine;


use App\Entity\Graph;
use App\Entity\GraphLine;

interface GraphLineServiceInterface
{
    /**
     * @param $id
     * @return GraphLine
     */
    public function findById($id): GraphLine;

    /**
     * @param Graph $graph
     * @param bool $flush
     * @return GraphLine
     */
    public function createDefaultGraphLine(Graph $graph, bool $flush = true): GraphLine;
}
