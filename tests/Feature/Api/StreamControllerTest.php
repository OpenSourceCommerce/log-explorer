<?php

namespace App\Tests\Feature\Api;

use App\Tests\WebTestCase;

class StreamControllerTest extends webTestCase
{
    public function testGetTable()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/stream/'.$logView->getUuid().'/table');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testList()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/stream/'.$logView->getUuid().'/list');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testSummary()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/stream/'.$logView->getUuid().'/summary');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testGraph()
    {
        $client = $this->getUserClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/stream/'.$logView->getUuid().'/graph');
        $this->assertApiResponseIsSuccessful($client);
    }
}
