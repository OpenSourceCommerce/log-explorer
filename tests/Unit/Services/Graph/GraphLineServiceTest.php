<?php


namespace App\Tests\Unit\Services\Graph;


use App\Entity\Graph;
use App\Services\GraphLine\GraphLineServiceInterface;
use App\Tests\WebTestCase;

class GraphLineServiceTest extends WebTestCase
{
    public function getGraphLineService(): GraphLineServiceInterface
    {
        return $this->getService(GraphLineServiceInterface::class);
    }

    public function testCreateDefaultGraphLine()
    {
        $graph = $this->initNewGraph();

        $line = $this->getGraphLineService()->createDefaultGraphLine($graph);

        $this->assertNotNull($line);
        $this->assertNotNull($line->getId());
    }

    public function initNewGraph(): Graph
    {
        $graph = new Graph();
        $graph->setTable('nginx_access');
        $graph->setMaxPoint(10);
        $graph->setTitle('Nginx Access');

        return $graph;
    }
}
