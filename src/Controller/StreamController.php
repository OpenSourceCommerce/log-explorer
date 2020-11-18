<?php


namespace App\Controller;


use App\Services\Clickhouse\ConnectionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class StreamController extends AbstractController
{
    /**
     * @Route("/stream", name="stream")
     * @param ConnectionInterface $connection
     * @return JsonResponse
     */
    public function index(ConnectionInterface $connection)
    {
        $connection->ping();
        return $this->json([]);
    }
}