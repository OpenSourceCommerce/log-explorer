<?php


namespace App\Tests;


class WebTestCase extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
{
    public function getService($name)
    {
        if (empty(self::$container)) {
            self::bootKernel();
        }
        return self::$container->get($name);
    }
}