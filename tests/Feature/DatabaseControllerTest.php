<?php

namespace App\Tests\Feature;

use App\Tests\WebTestCase;

class DatabaseControllerTest extends webTestCase
{
    public function testIndexGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/table');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testIndexUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/table');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testIndexAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/table');
        $this->assertResponseIsSuccessful();
    }

    public function testCreateGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/table/create');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testCreateUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/table/create');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testCreateAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/table/create');
        $this->assertResponseIsSuccessful();
    }

    public function testUpdateGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/table/nginx_access');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testUpdateUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/table/nginx_access');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testUpdateAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/table/nginx_access');
        $this->assertResponseIsSuccessful();
    }
}
