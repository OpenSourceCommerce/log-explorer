<?php


namespace App\Tests\Unit\Services\User;


use App\Entity\User;
use App\Services\User\UserServiceInterface;
use App\Tests\WebTestCase;

class UserServiceTest extends WebTestCase
{
    /**
     * @return UserServiceInterface|null
     */
    public function getUserService()
    {
        return $this->getService(UserServiceInterface::class);
    }

    public function randomEmail()
    {
        return uniqid('random_') . '@example.com';
    }

    public function randomPassword()
    {
        return uniqid('password_');
    }

    public function deleteUser($email)
    {
        $service = $this->getUserService();
        $user = $service->findByEmail($email);

        if ($user) {
            $service->delete($user);
        }
    }

    public function initNewUser(): array
    {
        $email = $this->randomEmail();
        $password = $this->randomPassword();
        $user = new User();
        $user->setEmail($email);
        $user->setFirstName(uniqid('Random '));
        $user->setLastName(uniqid('_'));
        $user->setIsActive(random_int(0, 1));
        $user->setIsConfirmed(random_int(0, 1));
        $user->setPassword($password);

        return [$user, $password];
    }

    public function testGetAllUser()
    {
        $service = $this->getUserService();
        // Using efault options
        $options = [];

        $users = $service->getAllUser($options);

        $this->assertIsArray($users);
        $this->assertEquals(10, count($users));

        //Limit 3 items per page
        $options = [
            'limit' => 3
        ];

        $users = $service->getAllUser($options);

        $this->assertIsArray($users);
        $this->assertEquals(3, count($users));

        //Limit 5 items per page, and get last page
        $options = [
            'limit' => 5,
            'page' => 4
        ];

        $users = $service->getAllUser($options);

        $this->assertIsArray($users);
        $this->assertEquals(1, count($users));

        // Search users by email prefix "user0"
        $options = [
            'kw' => 'user0'
        ];

        $users = $service->getAllUser($options);

        $this->assertIsArray($users);
        $this->assertEquals(9, count($users));
    }

    public function testCreateUser()
    {
        /** @var User $user */
        list($user, $password) = $this->initNewUser();
        $service = $this->getUserService();
        $createdUser = $service->createUser($user, $password);

        // Search users by email prefix "random_"
        $options = [
            'kw' => 'random_'
        ];

        $users = $service->getAllUser($options);

        $this->assertIsArray($users);
        $this->assertEquals(1, count($users));

        $this->deleteUser($user->getEmail());
    }

    public function testUpdateUser()
    {
        /** @var User $user */
        list($user, $password) = $this->initNewUser();
        $service = $this->getUserService();
        $createdUser = $service->createUser($user, $password);
        $newEmail = "updated_" . $this->randomEmail();
        $oldActiveState = $createdUser->getIsActive();
        $oldConfirmedState = $createdUser->getIsConfirmed();

        $createdUser->setEmail($newEmail);
        $createdUser->setIsActive(!$oldActiveState);
        $createdUser->setIsConfirmed(!$oldConfirmedState);

        $updated = $service->updateUser($createdUser);

        $updatedUser = $service->findByEmail($newEmail);

        $this->assertIsObject($updatedUser);
        $this->assertTrue($updated);
        $this->assertEquals([
            !$oldConfirmedState,
            !$oldConfirmedState,
            $newEmail,
            $createdUser->getId(),
        ], [
            $updatedUser->getIsActive(),
            $updatedUser->getIsConfirmed(),
            $updatedUser->getEmail(),
            $updatedUser->getId(),
        ]);

        $this->deleteUser($newEmail);
    }
}
