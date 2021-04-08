<?php

namespace App\Tests\Feature\Api;

use App\Constant\ErrorCodeConstant;
use App\Tests\WebTestCase;

class DatabaseControllerTest extends webTestCase
{
    public function testGetTableUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/api/table');
        $this->assertResponseIsSuccessful();
        $data = $this->getApiResponse($client);
        $this->assertEquals(ErrorCodeConstant::ERROR_PERMISSION_DENIED, $data['error']);
    }

    public function testGetTable()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/api/table');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testGetColumns()
    {
        $client = $this->getAdminClient();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/api/table/'.$logView->getTable().'/columns');
        $this->assertApiResponseIsSuccessful($client);
    }

    public function testCreateTable()
    {
        $name = 'test_'.time();
        $client = $this->getAdminClient();
        $this->request($client, '/api/table/create', ['name' => $name, 'columns' => [['name' => 'col1', 'type' => 'String', 'origin' => ''], ['name' => 'col2', 'type' => 'Int8', 'origin' => '']]]);
        $this->assertApiResponseIsSuccessful($client);
        return $name;
    }

    /**
     * @depends testCreateTable
     */
    public function testUpdateGraph($name)
    {
        $client = $this->getAdminClient();
        $this->request($client, '/api/table/'.$name, ['name' => 'test_'.time(), 'columns' => [['name' => 'col1', 'type' => 'String', 'origin' => 'col1'], ['name' => 'col22', 'type' => 'UInt8', 'origin' => 'col2'], ['name' => 'col3', 'type' => 'String', 'origin' => '']]], 'PUT');
        $this->assertApiResponseIsSuccessful($client);
    }
}
