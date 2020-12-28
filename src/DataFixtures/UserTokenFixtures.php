<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\UserToken;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class UserTokenFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $user = $this->getReference(User::class.'_unconfirmed');
        $token = new UserToken();
        $token->setUser($user);
        $token->setToken('123456');
        $manager->persist($token);

        $manager->flush();
    }

    /**
     * @inheritDoc
     */
    public function getDependencies()
    {
        return [
            UserFixtures::class
        ];
    }
}
