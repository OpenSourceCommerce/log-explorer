<?php


namespace App\Controller\Api;


use App\Entity\Table;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\TableExistException;
use App\Form\TableType;
use App\Services\Database\DatabaseServiceInterface;
use App\Services\Table\TableServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Annotation\Route;

class DatabaseController extends ApiController
{
    /**
     * @Route("/api/database/tables", methods = "GET")
     * @param TableServiceInterface $tableService
     * @return Response
     */
    public function tables(TableServiceInterface $tableService): Response
    {
        $data = $tableService->getAllTable();
        return $this->responseSuccess(['data' => $data]);
    }

    /**
     * @Route("/api/database/{name}/columns", methods = "GET")
     * @param Table $table
     * @return Response
     */
    public function columns(Table $table): Response
    {
        return $this->responseSuccess([
            'table' => $table->getName(),
            'data' => $table->getColumns()->toArray()
        ]);
    }

    /**
     * @Route("/api/database/sync", methods = "POST")
     * @param DatabaseServiceInterface $databaseService
     * @return Response
     */
    public function syncAll(DatabaseServiceInterface $databaseService): Response
    {
        $databaseService->syncAllTableToSystem();

        return $this->responseSuccess();
    }

    /**
     * @Route("/api/database/create", methods = "POST")
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
                $options = [
                    'ttl' => $form->get('ttl')->getData()
                ];
                $table = $databaseService->createTable($form->get('name')->getData(), $form->get('columns')->getData(), $options);
            } catch (TableExistException $e) {
                return $this->responseError([
                    'message' => 'Table already exist'
                ]);
            } catch (Exception $e) {
                return $this->responseError([
                    'message' => 'Can not create table, please check if any table or column value is invalid'
                ]);
            }

            return $this->responseSuccess([
                'redirect' => $urlGenerator->generate('database_update', ['name' => $table->getName()])
            ]);
        }
        return $this->responseFormError($form);
    }

    /**
     * @Route("/api/database/{name}", methods = "PUT")
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
                return $this->responseError([
                    'message' => 'Table already exist'
                ]);
            } catch (Exception $e) {
                return $this->responseError([
                    'message' => 'Can not create table, please check if any table or column value is invalid'
                ]);
            } catch (ActionDeniedException $e) {
                return $this->responseError([
                    'message' => 'Can not create table'
                ]);
            }
            return $this->responseSuccess();
        }
        return $this->responseError([
            'message' => 'Can not create table'
        ]);
    }
}
