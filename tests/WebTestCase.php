<?php


namespace App\Tests;


use App\Entity\LogView;
use App\Services\LogView\LogViewServiceInterface;
use ReflectionClass;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Component\DomCrawler\Crawler;

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

    protected function getAdminClient(): KernelBrowser
    {
        $client = $this->createClient();
        $this->login($client, 'admin1@test.com');
        return $client;
    }

    protected function getUserClient($email = 'user001@test.com'): KernelBrowser
    {
        $client = $this->createClient();
        $this->login($client, $email);
        return $client;
    }

    protected function getToken(Crawler $crawler)
    {
        return $crawler->filterXpath("//meta[@name='custom']")->extract(array('content'))[0];
    }

    protected function login(KernelBrowser $client, $email, $password = '123456', $rememberMe = false): ?Crawler
    {
        $crawler = $client->request('GET', '/login');
        $params = [
            '_token' => $this->getToken($crawler),
            'email' => $email,
            'password' => $password,
            '_remember_me' => $rememberMe
        ];
        return $this->request($client, '/login', $params);
    }

    protected function request(KernelBrowser $client, $uri, $data = [], $method = 'POST'): ?Crawler
    {
        return $client->request($method, $uri, [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));
    }

    protected function assertApiResponseIsSuccessful(KernelBrowser $client): void
    {
        $this->assertResponseIsSuccessful();
        $data = $this->getApiResponse($client);
        $this->assertEquals(0, $data['error']);
    }

    protected function getApiResponse(KernelBrowser $client): array
    {
        $json = $client->getResponse()->getContent();
        return json_decode($json, true);
    }

    protected function getDefaultLogView(): ?LogView
    {
        /** @var LogViewServiceInterface $logViewService */
        $logViewService = $this->getService(LogViewServiceInterface::class);
        return $logViewService->getDefault();
    }
}
