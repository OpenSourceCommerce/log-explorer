<?php


namespace App\Controller\Api;


use App\Exceptions\ActionDeniedException;
use App\Exceptions\TableExistException;
use App\Exceptions\TableNotExistException;
use App\Form\TableType;
use App\Services\Clickhouse\Connection;
use App\Services\Database\DatabaseServiceInterface;
use App\Services\LogView\LogViewServiceInterface;
use Doctrine\DBAL\Exception as DBALException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Annotation\Route;

class DatabaseController extends ApiController
{
    /**
     * @Route("/api/table", methods = "GET")
     * @param LogViewServiceInterface $logViewService
     * @return JsonResponse
     */
    public function tables(LogViewServiceInterface $logViewService): JsonResponse
    {
        $list = $logViewService->list();
        $data = [];
        foreach ($list as $logView) {
            $data[] = $logView->getTable();
        }
        return $this->responseSuccess(['data' => $data]);
    }

    /**
     * @Route("/api/table/{name}/columns", methods = "GET")
     * @param string $name
     * @param Request $request
     * @param Connection $connection
     * @return JsonResponse
     */
    public function columns(string $name, Request $request, Connection $connection): JsonResponse
    {
        $chunk = $request->get('chunk', 0);
        $columns = $connection->getRawColumns($name);

        if (!empty($chunk) && is_numeric($chunk)) {
            $columns = array_chunk($columns, $chunk);
        }

        return $this->responseSuccess([
            'table' => $name,
            'data' => $columns
        ]);
    }

    /**
     * @Route("/api/table/create", methods = "POST")
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @param UrlGeneratorInterface $urlGenerator
     * @return JsonResponse
     */
    public function createTable(
        Request $request,
        DatabaseServiceInterface $databaseService,
        UrlGeneratorInterface $urlGenerator
    ): JsonResponse {
        $data = $request->request->all();
        $form = $this->createForm(TableType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $name = $form->get('name')->getData();
            try {
                $options = [
                    'ttl' => $form->get('ttl')->getData()
                ];
                $databaseService->createTable($name, $form->get('columns')->getData(), $options);
            } catch (TableExistException $e) {
                return $this->responseError([
                    'message' => 'Table already exist'
                ]);
            } catch (DBALException $e) {
                return $this->responseError([
                    'message' => 'Can not create table, please check if any table or column value is invalid'
                ]);
            }

            return $this->responseSuccess([
                'redirect' => $urlGenerator->generate('database_update', ['name' => $name])
            ]);
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/table/{name}", methods = "PUT")
     * @param string $name
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @return JsonResponse
     */
    public function updateTable(
        string $name,
        Request $request,
        DatabaseServiceInterface $databaseService
    ): JsonResponse {
        $data = $request->request->all();
        $form = $this->createForm(TableType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $databaseService->updateTable($name, $form->get('columns')->getData());
            } catch (TableNotExistException $e) {
                return $this->responseError([
                    'message' => 'Table does not exist'
                ]);
            } catch (DBALException $e) {
                return $this->responseError([
                    'message' => 'Can not update table, please check if any table or column value is invalid'
                ]);
            } catch (ActionDeniedException $e) {
                return $this->responseError([
                    'message' => 'Can not update table'
                ]);
            }
            return $this->responseSuccess();
        }
        return $this->responseError([
            'message' => 'Can not update table'
        ]);
    }

    /**
     * @Route("/api/table/{table}/{column}", methods = "DELETE")
     * @param string $table
     * @param string $column
     * @param DatabaseServiceInterface $databaseService
     * @return JsonResponse
     */
    public function removeColumn(
        string $table,
        string $column,
        DatabaseServiceInterface $databaseService
    ): JsonResponse {
        if ($column === 'timestamp') {
            return $this->responseError('Can not remove "timestamp" column');
        }
        try {
            $databaseService->removeTableColumn($table, $column);
        } catch (TableNotExistException $e) {
            return $this->responseError('Table does not exist');
        } catch (DBALException $e) {
            return $this->responseError('Can not remove column '.$e->getMessage());
        }
        return $this->responseSuccess([
            'message' => 'Delete successful'
        ]);
    }

    /**
     * @Route("/api/table/{table}/{column}", methods = "PUT")
     * @param string $table
     * @param string $column
     * @param Request $request
     * @param DatabaseServiceInterface $databaseService
     * @return JsonResponse
     */
    public function updateColumn(
        string $table,
        string $column,
        Request $request,
        DatabaseServiceInterface $databaseService
    ): JsonResponse {
        if ($column === 'timestamp') {
            return $this->responseError('Can not update "timestamp" column');
        }
        try {

            $databaseService->removeTableColumn($table, $column);
        } catch (TableNotExistException $e) {
            return $this->responseError('Table does not exist');
        } catch (DBALException $e) {
            return $this->responseError('Can not remove column '.$e->getMessage());
        }
        return $this->responseSuccess([
            'message' => 'Delete successful'
        ]);
    }
}
