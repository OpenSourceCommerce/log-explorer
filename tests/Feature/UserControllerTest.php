<?php

namespace App\Tests\Feature;

use App\Repository\UserRepository;
use App\Tests\WebTestCase;

class UserControllerTest extends webTestCase
{
    public function testIndexGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/user');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testIndexUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/user');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testIndexAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/user');
        $this->assertResponseIsSuccessful();
    }

    public function testCreateGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/user/create');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testCreateUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/user/create');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testCreateAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/user/create');
        $this->assertResponseIsSuccessful();
    }

    public function testUpdateGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/user/100');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testUpdateUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/user/100');
        $this->assertResponseStatusCodeSame(403);
    }

    public function testUpdateAdmin()
    {
        $client = $this->getAdminClient();
        $client->followRedirects();
        /** @var UserRepository $userRepository */
        $userRepository = $this->getService(UserRepository::class);
        $user = $userRepository->findOneBy(['email' => 'admin4@test.com']);
        $client->request('GET', '/user/'.$user->getId());
        $this->assertResponseIsSuccessful();
    }

    public function testConfirmation()
    {
        $client = $this->createClient();
        $client->followRedirects();
        /** @var UserRepository $userRepository */
        $userRepository = $this->getService(UserRepository::class);
        $user = $userRepository->findOneBy(['email' => 'unconfirmed@test.com']);
        $token = $user->getUserTokens()->first();
        $client->request('GET', '/confirmation/'.$token->getToken());
        $this->assertResponseIsSuccessful();
    }

    public function testProfileGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/profile');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testProfileUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/profile');
        $this->assertResponseIsSuccessful();
    }

    public function testProfileAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/profile');
        $this->assertResponseIsSuccessful();
    }

    public function testChangePasswordGuest()
    {
        $client = $this->createClient();
        $client->followRedirects();
        $crawler = $client->request('GET', '/profile/change-password');
        $this->assertResponseIsSuccessful();
        $this->assertEquals('http://localhost/login', $crawler->getUri());
    }

    public function testChangePasswordUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/profile/change-password');
        $this->assertResponseIsSuccessful();
    }

    public function testChangePasswordAdmin()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/profile/change-password');
        $this->assertResponseIsSuccessful();
    }
}
