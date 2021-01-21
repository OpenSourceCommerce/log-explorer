<?php

namespace App\Tests\Feature\Api;

use App\Constant\ErrorCodeConstant;
use App\Tests\WebTestCase;

class GraphControllerTest extends webTestCase
{
    public function testGetGraphsUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/api/graph');
        $this->assertResponseIsSuccessful();
        $data = $this->getApiResponse($client);
        $this->assertEquals(ErrorCodeConstant::ERROR_PERMISSION_DENIED, $data['error']);
    }

    public function testGetGraphs()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/api/graph');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testGetGraph()
    {
        $client = $this->getAdminClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/graph/'.$logView->getGraph()->getId());
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testCreateGraph()
    {
        $client = $this->getAdminClient();
        $this->request($client, '/api/graph/create', ['table' => 'nginx_access', 'title' => 'Nginx access', 'maxPoint' => 12, 'lines' => [['title' => 'Test', 'color' => '#000', 'filter' => '']]]);
        $this->assertApiResponseIsSuccessful($client);
        $data = $this->getApiResponse($client);
        return $data['id'];
    }

    /**
     * @depends testCreateGraph
     */
    public function testUpdateGraph($id)
    {
        $client = $this->getAdminClient();
        $this->request($client, '/api/graph/'.$id, ['table' => 'nginx_access', 'title' => 'Nginx access', 'maxPoint' => 12, 'lines' => [['title' => 'Test 1', 'color' => '#000', 'filter' => 'status = 200']]], 'PUT');
        $this->assertApiResponseIsSuccessful($client);
    }

    /**
     * @depends testCreateGraph
     */
    public function testDeleteGraph($id)
    {
        $client = $this->getAdminClient();
        $client->request('DELETE', '/api/graph/'.$id);
        $this->assertApiResponseIsSuccessful($client);
    }
}
