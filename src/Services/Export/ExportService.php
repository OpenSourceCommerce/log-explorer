<?php

namespace App\Services\Export;

use App\Constant\ExportConstant;
use App\Entity\Export;
use App\Repository\ExportRepository;
use App\Services\Stream\StreamServiceInterface;
use DateTime;
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
    /**
     * @var StreamServiceInterface
     */
    private $streamService;

    public function __construct(
        EntityManagerInterface $em,
        ParameterBagInterface $parameterBag,
        Filesystem $filesystem,
        StreamServiceInterface $streamService
    ) {

        $this->em = $em;
        $this->parameterBag = $parameterBag;
        $this->filesystem = $filesystem;
        $this->streamService = $streamService;
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

    private function slitFilter(array $filter): array
    {
        $filters = [];
        /** @var DateTime $from */
        $from = $filter['from'];
        /** @var DateTime $to */
        $to = $filter['to'];
        $interval = $this->parameterBag->get('app.logview.export_max_range');
        $range = $interval * 3600 - 1;
        while (true) {
            $option = $filter;
            $diff = $from->diff($to);
            $diffHour = $diff->days * 24 + $diff->h;
            $option['from'] = clone $from;
            if ($diffHour > $interval) {
                $newTo = clone $from;
                $newTo->add(new \DateInterval("PT{$range}S"));
                $option['to'] = $newTo;
                $from->add(new \DateInterval("PT{$interval}H"));
                $filters[] = $option;
            } else {
                $filters[] = $option;
                break;
            }
        }
        return $filters;
    }

    private function makeFilter(array $filter): array
    {
        $options = [
            'limit' => 0
        ];

        if (!empty($from = $filter['from'])) {
            if (is_numeric($from)) {
                $from = new DateTime("- {$from} minutes");
            } else {
                $from = new DateTime($from);
            }
            $options['from'] = $from;
        } else {
            $options['from'] = new DateTime('- 1 hour');
        }

        if (!empty($filter['to'])) {
            $to = new DateTime($filter['to']);
            $options['to'] = $to;
        } else {
            $options['to'] = new DateTime();
        }

        if (!empty($filter['filter'])) {
            $options['filter'] = $filter['filter'];
        } else {
            $options['filter'] = false;
        }

        return $this->slitFilter($options);
    }

    /**
     * @param Export $export
     * @return string
     */
    private function generateExportFilename(Export $export): string
    {
        $date = new DateTime();
        return uniqid("{$export->getTable()}_{$date->format('Y-m-d_H-i-s')}-") . "." . $export->getFormat();
    }

    /**
     * @inheritDoc
     */
    public function export(Export $export): ?string
    {
        $filters = $this->makeFilter($export->getFilter());
        $filename = $this->generateExportFilename($export);
        $subDirectory = $this->generateSubDirectory($filename);

        $total = count($filters) - 1;

        foreach ($filters as $k => $filter) {
            $data = $this->streamService->getLogsInRange($export->getTable(), $filter);
            $mode = empty($k) ? self::MODE_NEW_FILE : self::MODE_APPEND_FILE;
            $isEnd = $total == $k;
            if ($mode != self::MODE_NEW_FILE && empty($data) && !$isEnd) {
                continue;
            }
            switch ($export->getFormat()) {
                case ExportConstant::CSV_FORMAT:
                    $this->exportCsv($subDirectory, $filename, $data, $mode);
                    break;
                case ExportConstant::JSON_FORMAT:
                    $this->exportJson($subDirectory, $filename, $data, $mode, $isEnd);
                    break;
            }
        }

        return $this->getOutputPath().'/'.$subDirectory.'/'.$filename;
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
    public function exportCsv(string $subDirectory, string $filename, array $data, int $mode = self::MODE_SINGLE_FILE)
    {
        $fullPath = "{$this->getOutputDirectory($subDirectory)}/{$filename}";

        if ($mode == self::MODE_SINGLE_FILE || $mode == self::MODE_NEW_FILE) {
            $this->deleteExistingFile($fullPath);
            $file = fopen($fullPath, 'w');
            fputcsv($file, array_keys($data[0]));
        } else {
            $file = fopen($fullPath, 'a');
        }

        foreach ($data as $row) {
            fputcsv($file, $row);
        }

        fclose($file);
    }

    /**
     * @inheritDoc
     */
    public function exportJson(string $subDirectory, string $filename, array $data, int $mode = self::MODE_SINGLE_FILE, bool $isEnd = false)
    {
        $fullPath = "{$this->getOutputDirectory($subDirectory)}/{$filename}";

        if ($mode == self::MODE_NEW_FILE || $mode == self::MODE_SINGLE_FILE) {
            $this->deleteExistingFile($fullPath);
            $file = fopen($fullPath, 'w');
        } else {
            $file = fopen($fullPath, 'a');
        }

        if ($mode == self::MODE_SINGLE_FILE) {
            fputs($file, json_encode($data));
        } elseif ($mode == self::MODE_NEW_FILE) {
            if ($isEnd) {
                fputs($file, json_encode($data));
            } else {
                fputs($file, rtrim(json_encode($data), "]"));
            }
        } else {
            if ($isEnd) {
                fputs($file, (empty($data) ? '' : ',') . ltrim(json_encode($data), "["));
            } else {
                fputs($file, ',' . trim(json_encode($data), "[]"));
            }
        }

        fclose($file);
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
