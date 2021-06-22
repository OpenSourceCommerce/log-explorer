<?php

namespace App\Tests\Feature\Api;

use App\Tests\WebTestCase;

class LogViewControllerTest extends webTestCase
{
    public function testGetTable()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/api/logview/list');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testGetColumnSetting()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/logview/'.$logView->getUuid().'/setting/columns');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testDetail()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/logview/'.$logView->getUuid());
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testUpdateColumnSetting()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $this->request($client, '/api/logview/'.$logView->getUuid().'/setting/columns', ['column' => 'status', 'visible' => 1, 'index' => 1], 'PUT');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testUpdateSummary()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $this->request($client, '/api/logview/'.$logView->getUuid().'/summary', ['columns' => ['status']], 'PUT');
        $this->assertApiResponseIsSuccessful($client);
    }
}
