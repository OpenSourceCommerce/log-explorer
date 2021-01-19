<?php


namespace App\Tests\Unit\Services\Graph;


use App\Entity\Graph;
use App\Services\Graph\GraphServiceInterface;
use App\Services\GraphLine\GraphLineServiceInterface;
use App\Tests\WebTestCase;

class GraphServiceTest extends WebTestCase
{
    public function getGraphService(): GraphServiceInterface
    {
        return $this->getService(GraphServiceInterface::class);
    }

    public function testCreateGraph()
    {
        $graph = $this->initNewGraph();

        $this->getGraphService()->createGraph($graph, []);
        $graphs = $this->getGraphService()->getAllGraph();

        $this->assertIsArray($graphs);
        $this->assertGreaterThan(1, count($graphs));
    }

    /**
     * @return Graph
     */
    public function initNewGraph(): Graph
    {
        $graph = new Graph();
        $graph->setTable('nginx_access');
        $graph->setMaxPoint(10);
        $graph->setTitle('Nginx Access');
        return $graph;
    }
}
