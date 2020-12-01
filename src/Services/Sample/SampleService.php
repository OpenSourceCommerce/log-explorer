<?php


namespace App\Services\Sample;


use App\Services\Clickhouse\Connection;

class SampleService implements SampleServiceInterface
{
    /** @var Connection */
    private $connection;

    /**
     * @param Connection $connection
     */
    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @inheritDoc
     */
    public function createDataAt(\DateTime $date, int $number)
    {
        for ($i = 0; $i < $number; $i++) {
            $this->connection->insert('nginx_access', [
                'ip' => '10.0.0.'.random_int(1, 255),
                'customer' => '',
                'timestamp' => $date->format('Y-m-d H:i:s'),
                'url' => $this->randomUrl(true),
                'status' => $this->randomStatus(),
                'body_bytes_sent' => random_int(2, 99999999),
                'referer' => $this->randomUrl(),
                'user_agent' => $this->randomAgent(),
            ]);
        }
    }

    private function randomUrl($withMethod = false) {
        $methods = [
            'GET',
            'GET',
            'GET',
            'GET',
            'GET',
            'POST',
        ];
        $domains = [
            '',
            'https://sample.com',
            'https://shop.com',
            'https://test.com',
        ];
        $list = [
            '/new',
            '/products',
            '/',
            '/search',
            '/categories',
            '/category/food',
            '/category/meat',
            '/category/drink',
        ];
        return ($withMethod ? $this->randomFrom($methods).' ' : '').$this->randomFrom($domains).$this->randomFrom($list);
    }

    private function randomStatus() {
        $list = [
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            200,
            303,
            400,
            404,
            499,
            500,
        ];
        return $this->randomFrom($list);
    }

    private function randomFrom(array $arr) {
        return $arr[random_int(0, count($arr) - 1)];
    }

    private function randomAgent()
    {
        $list = [
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
            'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0',
            'Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.00',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        ];
        return $this->randomFrom($list);
    }
}
