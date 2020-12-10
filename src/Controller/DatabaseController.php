<?php

namespace App\Controller;

use App\Entity\Table;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\InvalidSqlQueryException;
use App\Exceptions\TableExistException;
use App\Form\TableType;
use App\Services\Clickhouse\ClickhouseServiceInterface;
use App\Services\Database\DatabaseServiceInterface;
use App\Services\Table\TableServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

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
        throw new AccessDeniedHttpException();
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
        throw new AccessDeniedHttpException();
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

    /**
     * @Route("/database/create", name="database_create", methods = "GET")
     * @param ClickhouseServiceInterface $clickhouseService
     * @return Response
     */
    public function createTableView(ClickhouseServiceInterface $clickhouseService): Response
    {
        $types = $clickhouseService->getTypes();
        return $this->render('database/form.html.twig', ['types' => json_encode($types)]);
    }

    /**
     * @Route("/database/create", name="database_create_table", methods = "POST")
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @param UrlGeneratorInterface $urlGenerator
     * @return Response
     */
    public function createTable(Request $request, DatabaseServiceInterface $databaseService, UrlGeneratorInterface $urlGenerator): Response
    {
        $data = $request->request->all();
        $form = $this->createForm(TableType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $table = $databaseService->createTable($form->get('name')->getData(), $form->get('columns')->getData());
            } catch (TableExistException $e) {
                return $this->json([
                    'error' => 0,
                    'message' => 'Table already exist'
                ]);
            } catch (Exception $e) {
                return $this->json([
                    'error' => 0,
                    'message' => 'Could not create table, please check if any table or column value is invalid'
                ]);
            }
            return $this->json([
                'error' => 0,
                'redirect' => $urlGenerator->generate('database_update', ['name' => $table->getName()])
            ]);
        }
        return $this->json([
            'error' => 1,
            'message' => 'Can not create table'
        ]);
    }

    /**
     * @Route("/database/{name}", name="database_update", methods = "GET")
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

    /**
     * @Route("/database/{name}", name="database_update_table", methods = "PUT")
     * @param Table $table
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @param UrlGeneratorInterface $urlGenerator
     * @return Response
     */
    public function updateTable(Table $table, Request $request, DatabaseServiceInterface $databaseService, UrlGeneratorInterface $urlGenerator): Response
    {
        $data = $request->request->all();
        $form = $this->createForm(TableType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $databaseService->updateTable($table, $form->get('name')->getData(), $form->get('columns')->getData());
            } catch (TableExistException $e) {
                return $this->json([
                    'error' => 1,
                    'message' => 'Table already exist'
                ]);
            } catch (Exception $e) {
                return $this->json([
                    'error' => 1,
                    'message' => 'Could not update table, please check if any column value is invalid'
                ]);
            } catch (ActionDeniedException $e) {
                return $this->json([
                    'error' => 1,
                    'message' => 'Can not update table'
                ]);
            }
            return $this->json([
                'error' => 0,
            ]);
        }
        dd($form->getErrors(true)->current()->getOrigin()->getName(),$form->getErrors(true)->current()->getOrigin()->getData());
        return $this->json([
            'error' => 1,
            'message' => 'Can not update table'
        ]);
    }
}
