<?php

namespace App\Tests\Feature;

use App\Repository\GraphRepository;
use App\Tests\WebTestCase;

class GraphControllerTest extends webTestCase
{
    public function testIndexGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/graph');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testIndexUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/graph');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testIndexAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/graph');
        $this->assertResponseIsSuccessful();
    }

    public function testCreateGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/graph/create');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testCreateUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/graph/create');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testCreateAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/graph/create');
        $this->assertResponseIsSuccessful();
    }

    public function testUpdateGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/graph/100');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testUpdateUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/graph/100');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testUpdateAdmin()
    {
        $client = $this->getAdminClient();
        $client->followRedirects();
        $logView = $this->getDefaultLogView();
        $client->request('GET', '/graph/'.$logView->getGraph()->getId());
        $this->assertResponseIsSuccessful();
    }
}
