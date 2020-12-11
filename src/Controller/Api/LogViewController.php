<?php


namespace App\Controller\Api;


use App\Services\LogView\LogViewServiceInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class TableController
 * @package App\Controller\Api
 */
class LogViewController extends ApiController
{
    public function list(LogViewServiceInterface $dashboardService){
        $tables = $dashboardService->getDefault();

        return $this->responseSuccess([
            'data' => $tables
        ]);
    }
}
