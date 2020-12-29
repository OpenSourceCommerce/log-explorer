<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $userPasswordEncoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        for ($i = 1; $i <= 5; ++$i) {
            $admin = new User();
            $admin->setIsAdmin(true);
            $admin->setIsActive(true);
            $admin->setIsConfirmed(true);
            $admin->setFirstName('Admin');
            $admin->setLastName("{$i}");
            $admin->setEmail("admin{$i}@test.com");
            $admin->setPassword($this->userPasswordEncoder->encodePassword($admin, '123456'));
            $manager->persist($admin);
        }

        for ($i = 1; $i < 10; ++$i) {
            $user = new User();
            $user->setIsAdmin(false);
            $user->setIsActive(true);
            $user->setIsConfirmed(true);
            $user->setFirstName('User');
            $user->setLastName("{$i}");
            $user->setEmail(sprintf('user%03d@test.com', $i));
            $user->setPassword($this->userPasswordEncoder->encodePassword($user, '123456'));
            $manager->persist($user);
        }

        $user = new User();
        $user->setIsAdmin(false);
        $user->setIsActive(true);
        $user->setIsConfirmed(false);
        $user->setFirstName('Unconfirmed');
        $user->setLastName("{$i}");
        $user->setEmail('unconfirmed@test.com');
        $manager->persist($user);
        $this->addReference(User::class.'_unconfirmed', $user);

        $user = new User();
        $user->setIsAdmin(false);
        $user->setIsActive(false);
        $user->setIsConfirmed(true);
        $user->setFirstName('Inactive');
        $user->setLastName("{$i}");
        $user->setEmail('inactive@test.com');
        $manager->persist($user);
        $this->addReference(User::class.'_inactive', $user);

        $manager->flush();
    }
}
