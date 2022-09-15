<?php

namespace App\Controller;

use App\Services\Clickhouse\ClickhouseServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SettingController extends AbstractController
{
    /**
     * @Route("/setting", priority=10, name="page_setting", methods = "GET")
     * @param ClickhouseServiceInterface $clickhouseService
     * @param Request $request
     * @return Response
     */
    public function setting(ClickhouseServiceInterface $clickhouseService, Request $request): Response
    {
        $types = $clickhouseService->getTypes();
        $tab = $request->get('tab', 'profile');

        return $this->render('setting/index.html.twig', [
            'user' => $this->getUser(),
            'types' => json_encode($types),
            'tab' => $tab
        ]);
    }
}
