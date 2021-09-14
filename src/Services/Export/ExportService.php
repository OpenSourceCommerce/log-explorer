<?php

namespace App\Services\Export;

use App\Constant\ExportConstant;
use App\Entity\Export;
use App\Entity\User;
use App\Repository\ExportRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

class ExportService implements ExportServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $em;
    /**
     * @var ParameterBagInterface
     */
    private $parameterBag;
    /**
     * @var Filesystem
     */
    private $filesystem;

    public function __construct(EntityManagerInterface $em, ParameterBagInterface $parameterBag, Filesystem $filesystem)
    {

        $this->em = $em;
        $this->parameterBag = $parameterBag;
        $this->filesystem = $filesystem;
    }

    /**
     * @return ExportRepository
     */
    private function getRepository(): ExportRepository
    {
        return $this->em->getRepository(Export::class);
    }

    /**
     * @inheritDoc
     */
    public function createOrUpdate(Export $export): Export
    {
        $this->em->persist($export);
        $this->em->flush();

        return $export;
    }

    /**
     * @inheritDoc
     */
    public function findAll()
    {
        return $this->getRepository()->findAll();
    }

    /**
     * @inheritDoc
     */
    public function findNotProcessed(?int $limit = 1): array
    {
        return $this->getRepository()->findBy(['finishedAt' => null], ['id' => 'asc'], $limit);
    }

    /**
     * @inheritDoc
     */
    public function export(string $filename, string $format, array $data): ?string
    {
        switch ($format) {
            case ExportConstant::CSV_FORMAT:
                return $this->exportCsv($filename, $data);
            case ExportConstant::JSON_FORMAT:
                return $this->exportJson($filename, $data);
        }

        return null;
    }

    private function getOutputPath(): string
    {
        return $this->parameterBag->get('app.logview.export_directory');
    }

    private function getOutputDirectory(string $path): string
    {
        $outputPath = $this->getOutputPath();
        $rootDirectory = $this->parameterBag->get('app.root_directory');
        $outputDirectory = "{$rootDirectory}/public{$outputPath}/{$path}";

        if (!$this->filesystem->exists($outputDirectory)) {
            $this->filesystem->mkdir($outputDirectory);
        }

        return $outputDirectory;
    }

    /**
     * @inheritDoc
     */
    public function exportCsv(string $filename, array $data): ?string
    {
        $subDirectory = $this->generateSubDirectory($filename);
        $fullPath = "{$this->getOutputDirectory($subDirectory)}/{$filename}";
        $this->deleteExistingFile($fullPath);
        $file = fopen($fullPath, 'w');

        fputcsv($file, array_keys($data[0]));

        foreach ($data as $row) {
            fputcsv($file, $row);
        }

        return "{$this->getOutputPath()}/{$subDirectory}/{$filename}";
    }

    /**
     * @inheritDoc
     */
    public function exportJson(string $filename, array $data): ?string
    {
        $subDirectory = $this->generateSubDirectory($filename);
        $fullPath = "{$this->getOutputDirectory($subDirectory)}/{$filename}";
        $this->deleteExistingFile($fullPath);
        $file = fopen($fullPath, 'w');

        fputs($file, json_encode($data));

        return "{$this->getOutputPath()}/{$subDirectory}/{$filename}";
    }

    private function deleteExistingFile($fullPath)
    {
        if ($this->filesystem->exists($fullPath)) {
            $this->filesystem->remove($fullPath);
        }
    }

    /**
     * @inheritDoc
     */
    public function findExpiredExports(int $limit): array
    {
        return $this->getRepository()->findExpiredExports($limit);
    }

    /**
     * @inheritDoc
     */
    public function removeExport(Export $export)
    {
        if (!empty($export->getPath())) {
            $rootDirectory = $this->parameterBag->get('app.root_directory');
            $fullPath = "{$rootDirectory}/public{$export->getPath()}";

            if ($this->filesystem->exists($fullPath)) {
                $this->filesystem->remove($fullPath);
            }
        }

        $this->em->remove($export);
        $this->em->flush();
    }

    private function generateSubDirectory(string $filename): string
    {
        $subDirectory = md5(uniqid($filename));
        return substr($subDirectory, 0, 2) . '/' . substr($subDirectory, 2, 2);
    }

    /**
     * @inheritDoc
     */
    public function findById($id)
    {
        return $this->getRepository()->find($id);
    }

    /**
     * @inheritDoc
     */
    public function findExports(int $limit = 20)
    {
        return $this->getRepository()->findExports($limit);
    }

    /**
     * @inheritDoc
     */
    public function removeExports(array $exports = [])
    {
        foreach ($exports as $export) {
            $this->removeExport($export);
        }
    }
}
