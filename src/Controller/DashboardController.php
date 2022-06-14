<?php

namespace App\Controller;

use App\Constant\VoterConstant;
use App\Entity\Dashboard;
use App\Services\Dashboard\DashboardServiceInterface;
use App\Services\Export\DashboardExportImportServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard", priority=10, name="dashboard_default")
     * @param DashboardServiceInterface $dashboardService
     * @return Response
     */
    public function default(DashboardServiceInterface $dashboardService): Response
    {
        $dashboard = $dashboardService->getDefaultDashboard();
        if ($dashboard) {
            return $this->redirectToRoute('dashboard', ['uuid' => $dashboard->getUuid()]);
        }
        return $this->render('dashboard/list.html.twig');
    }

    /**
     * @Route("/dashboard/list", priority=10, name="dashboard_list")
     */
    public function list(): Response
    {
        return $this->render('dashboard/list.html.twig');
    }

    /**
     * @Route("/dashboard/create", priority=10, name="dashboard_create")
     * @return Response
     */
    public function create(): Response
    {
        $this->denyAccessUnlessGranted(VoterConstant::CREATE, new Dashboard());
        return $this->render('dashboard/form.html.twig');
    }

    /**
     * @Route("/dashboard/export", priority=10, name="dashboard_export")
     * @param Request $request
     * @param DashboardExportImportServiceInterface $dashboardExportImportService
     * @return Response
     */
    public function export(Request $request, DashboardExportImportServiceInterface $dashboardExportImportService): Response
    {
        $mode = $request->get('mode');
        $page = $request->get('page', 'dashboard_list');
        $ids = $request->get('id');
        if (is_null($mode) && empty($ids)) {
            $this->addFlash('warning', 'No item selected');
            return $this->redirectToRoute($page);
        }
        if ($mode == 'all') {
            $data = $dashboardExportImportService->exportAll();
        } elseif ($mode == 'dashboard') {
            $data = $dashboardExportImportService->exportAllDashboard();
        } elseif ($mode == 'widget') {
            $data = $dashboardExportImportService->exportAllWidget();
        } elseif ($page == 'dashboard_list') {
            $data = $dashboardExportImportService->exportDashboard($ids);
        } else {
            $data = $dashboardExportImportService->exportWidget($ids);
        }
        $filename = uniqid('export_'.date('Y_m_d_H_i')).'.json';
        $response = new Response($data);

        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $filename
        );
        $response->headers->set('Content-Disposition', $disposition);

        return $response;
    }

    /**
     * @Route("/dashboard/import", priority=10, name="dashboard_import")
     * @param Request $request
     * @param DashboardExportImportServiceInterface $dashboardExportImportService
     * @return Response
     */
    public function import(Request $request, DashboardExportImportServiceInterface $dashboardExportImportService): Response
    {
        /** @var UploadedFile $file */
        $file = $request->files->get('import');
        $page = $request->get('page', 'dashboard_list');
        if ($file->getError()) {
            $this->addFlash('warning', 'Upload file error');
            return $this->redirectToRoute($page);
        } elseif ($file->getClientOriginalExtension() != 'json') {
            $this->addFlash('warning', 'Invalid upload file');
            return $this->redirectToRoute($page);
        }
        try {
            $data = json_decode($file->getContent(), true);
            if (!is_array($data)) {
                throw new \LogicException('Invalid upload file');
            }
            $dashboardExportImportService->import($data);
        } catch (\Exception $e) {
            $this->addFlash('warning', 'Invalid upload file');
            return $this->redirectToRoute($page);
        }
        $this->addFlash('success', 'Import successful');
        return $this->redirectToRoute($page);
    }

    /**
     * @Route("/dashboard/edit/{id}", name="dashboard_edit")
     * @param Dashboard $dashboard
     * @return Response
     */
    public function edit(Dashboard $dashboard): Response
    {
        $this->denyAccessUnlessGranted(VoterConstant::EDIT, $dashboard);
        return $this->render('dashboard/form.html.twig', [
            'dashboard' => $dashboard,
        ]);
    }
}
