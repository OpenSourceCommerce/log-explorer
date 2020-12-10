<?php


namespace App\Tests;


use ReflectionClass;

class WebTestCase extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
{
    public function getService($name)
    {
        if (empty(self::$container)) {
            self::bootKernel();
        }
        return self::$container->get($name);
    }

    protected static function getMethod($class, $method): \ReflectionMethod
    {
        $class = new ReflectionClass($class);
        $method = $class->getMethod($method);
        $method->setAccessible(true);
        return $method;
    }
}
