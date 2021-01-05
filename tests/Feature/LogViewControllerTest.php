<?php

namespace App\Tests\Feature;

use App\Tests\WebTestCase;

class LogViewControllerTest extends webTestCase
{
    public function testIndexGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/table/nginx_access/logview');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testIndexUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/table/nginx_access/logview');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testIndexAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/table/nginx_access/logview');
        $this->assertResponseIsSuccessful();
    }
}
