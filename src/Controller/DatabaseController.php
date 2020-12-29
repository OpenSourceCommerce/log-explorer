<?php

namespace App\Controller;

use App\Entity\Table;
use App\Services\Clickhouse\ClickhouseServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DatabaseController extends AbstractController
{
    /**
     * @Route("/table", priority=10, name="database")
     */
    public function index(): Response
    {
        return $this->render('database/tables.html.twig');
    }

    /**
     * @Route("/table/create", name="database_create", methods = "GET")
     * @param ClickhouseServiceInterface $clickhouseService
     * @return Response
     */
    public function createTableView(ClickhouseServiceInterface $clickhouseService): Response
    {
        $types = $clickhouseService->getTypes();
        return $this->render('database/form.html.twig', ['types' => json_encode($types)]);
    }

    /**
     * @Route("/table/{name}", name="database_update", methods = "GET")
     * @param Table $table
     * @param ClickhouseServiceInterface $clickhouseService
     * @return Response
     */
    public function updateTableView(Table $table, ClickhouseServiceInterface $clickhouseService): Response
    {
        $types = $clickhouseService->getTypes();
        return $this->render('database/form.html.twig', [
            'types' => json_encode($types),
            'table' => $table,
        ]);
    }
}
