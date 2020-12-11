<?php


namespace App\Services\Graph;


use App\Entity\Graph;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;

interface GraphServiceInterface
{
    /**
     * @param Graph $graph
     * @param array $lines
     * @return Graph
     * @throws ActionDeniedException
     * @throws BadSqlException
     */
    public function createGraph(Graph $graph, array $lines): Graph;

    /**
     * @param Graph $graph
     * @param array $lines
     * @return Graph
     * @throws ActionDeniedException
     * @throws BadSqlException
     */
    public function updateGraph(Graph $graph, array $lines): Graph;
}
