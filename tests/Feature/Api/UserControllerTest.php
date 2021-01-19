<?php

namespace App\Tests\Feature\Api;

use App\Constant\ErrorCodeConstant;
use App\Repository\UserRepository;
use App\Tests\WebTestCase;

class UserControllerTest extends webTestCase
{
    public function testGetUsersUser()
    {
        $client = $this->getUserClient();
        $client->request('GET', '/api/user');
        $this->assertResponseIsSuccessful();
        $data = $this->getApiResponse($client);
        $this->assertEquals(ErrorCodeConstant::ERROR_PERMISSION_DENIED, $data['error']);
    }

    public function testGetUsers()
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/api/user');
        $this->assertApiResponseIsSuccessful($client);
        $data = $this->getApiResponse($client);
        return $data['data'];
    }

    public function testCreateUser()
    {
        $email = 'test_'.time().'@test.com';
        $client = $this->getAdminClient();
        $this->request($client, '/api/user/create', ['first_name' => 'Test', 'last_name' => 'Add', 'email' => $email, 'is_admin' => true]);
        $this->assertApiResponseIsSuccessful($client);
        $data = $this->getApiResponse($client);
        return $data['id'];
    }

    /**
     * @depends testCreateUser
     */
    public function testGetUser($id)
    {
        $client = $this->getAdminClient();
        $client->request('GET', '/api/user/'.$id);
        $this->assertApiResponseIsSuccessful($client);
        $data = $this->getApiResponse($client);
        return $data['data'];
    }

    /**
     * @depends testCreateUser
     */
    public function testConfirmationUser($id)
    {
        $client = $this->getAdminClient();
        /** @var UserRepository $userRepository */
        $userRepository = $this->getService(UserRepository::class);
        $user = $userRepository->find($id);
        $token = $user->getUserTokens()->first();
        $password = 'Qq?'.time();
        $this->request($client, '/api/confirmation/'.$token->getToken(), ['password' => $password], 'PUT');
        $this->assertApiResponseIsSuccessful($client);
        self::ensureKernelShutdown();
        $client = $this->createClient();
        $this->login($client, $user->getEmail(), $password);
        $this->assertApiResponseIsSuccessful($client);
    }

    /**
     * @depends testGetUser
     */
    public function testUpdateUser($user)
    {
        $user['is_admin'] = false;
        $client = $this->getAdminClient();
        $this->request($client, '/api/user/'.$user['id'], $user, 'PUT');
        $this->assertApiResponseIsSuccessful($client);
    }

    /**
     * @depends testCreateUser
     */
    public function testDisableUser($id)
    {
        $client = $this->getAdminClient();
        $this->request($client, '/api/user/status/'.$id, ['is_active' => 0], 'PUT');
        $this->assertApiResponseIsSuccessful($client);
    }

    /**
     * @depends testCreateUser
     */
    public function testDeleteUser($id)
    {
        $client = $this->getAdminClient();
        $client->request('DELETE', '/api/user/'.$id);
        $this->assertApiResponseIsSuccessful($client);
        $client->request('GET', '/api/user/'.$id);
        $this->assertResponseStatusCodeSame(404);
    }
}
