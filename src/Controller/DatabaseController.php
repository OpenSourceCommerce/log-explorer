<?php

namespace App\Controller;

use App\Entity\Table;
use App\Exceptions\InvalidSqlQueryException;
use App\Exceptions\TableExistException;
use App\Services\Database\DatabaseServiceInterface;
use App\Services\Table\TableServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DatabaseController extends AbstractController
{
    /**
     * @Route("/database", name="database")
     */
    public function index(): Response
    {
        return $this->render('database/tables.html.twig');
    }

    /**
     * @Route("/database/tables", name="database_tables")
     * @param TableServiceInterface $tableService
     * @return Response
     */
    public function tables(TableServiceInterface $tableService): Response
    {
        $data = $tableService->getAllTable();
        return $this->json([
            'error' => 0,
            'data' => $data
        ]);
    }

    /**
     * @Route("/database/{name}/columns", name="database_columns")
     * @param Table $table
     * @return Response
     */
    public function columns(Table $table): Response
    {
        return $this->json([
            'error' => 0,
            'table' => $table->getName(),
            'data' => $table->getColumns()
        ]);
    }

    /**
     * @Route("/database/query", name="database_query", methods = "GET")
     */
    public function query(): Response
    {
        return $this->render('database/query.html.twig');
    }

    /**
     * @Route("/database/query", name="database_query_table", methods = "POST")
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @return Response
     */
    public function queryTable(Request $request, DatabaseServiceInterface $databaseService): Response
    {
        $query = trim($request->get('query'));
        if (empty($query)) {
            return $this->json([
                'error' => 1,
                'message' => 'Missing query'
            ]);
        }
        try {
            $databaseService->processQuery($query);
        } catch (InvalidSqlQueryException $e) {
            return $this->json([
                'error' => 1,
                'message' => 'Invalid query'
            ]);
        } catch (TableExistException $e) {
            return $this->json([
                'error' => 1,
                'message' => 'Table already exist'
            ]);
        } catch (Exception $e) {
            return $this->json([
                'error' => 1,
                'message' => 'Can not process query'
            ]);
        }
        return $this->json([
            'error' => 0
        ]);
    }

    /**
     * @Route("/database/sync", name="database_sync", methods = "POST")
     * @param DatabaseServiceInterface $databaseService
     * @return Response
     */
    public function syncAll(DatabaseServiceInterface $databaseService): Response
    {
        $databaseService->syncAllTableToSystem();
        return $this->json([
            'error' => 0
        ]);
    }
}
