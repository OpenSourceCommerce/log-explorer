<?php

namespace App\Tests\Feature;

use App\Tests\WebTestCase;

class IndexControllerTest extends webTestCase
{
    public function testIndexGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testIndexUser()
    {
        $client = $this->getUserClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/');
        $this->assertResponseIsSuccessful();
        $this->assertStringStartsWith('http://localhost/log-view/', $crawler->getUri());
    }
}
