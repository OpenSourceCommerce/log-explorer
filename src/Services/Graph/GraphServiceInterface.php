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

    /**
     * @return Graph[]|array
     */
    public function getAllGraph(): array;

    /**
     * @param Graph $graph
     */
    public function delete(Graph $graph);

    /**
     * @param string $table
     * @param int $maxPoint
     * @param bool $flush
     * @return Graph
     */
    public function createLogViewGraph(string $table, int $maxPoint = 12, bool $flush = true): Graph;
}
