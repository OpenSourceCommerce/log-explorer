<?php

namespace App\Controller;

use App\Entity\Table;
use App\Exceptions\InvalidSqlQueryException;
use App\Exceptions\TableExistException;
use App\Services\Clickhouse\Connection;
use App\Services\Database\DatabaseServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class DatabaseController extends AbstractController
{
    /**
     * @Route("/database", name="database")
     */
    public function index(): Response
    {
        return $this->render('database/index.html.twig', [
            'controller_name' => 'DatabaseController',
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
}
