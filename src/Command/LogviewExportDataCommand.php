<?php

namespace App\Command;

use App\Entity\Export;
use App\Services\Export\ExportServiceInterface;
use App\Services\Stream\StreamServiceInterface;
use DateTime;
use Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class LogviewExportDataCommand extends Command
{
    protected static $defaultName = 'logview:export-data';
    protected static $defaultDescription = 'Export Logview Data';
    /**
     * @var ExportServiceInterface
     */
    private $exportService;
    /**
     * @var StreamServiceInterface
     */
    private $streamService;
    /**
     * @var ParameterBagInterface
     */
    private $parameterBag;

    protected function configure(): void
    {
    }

    public function __construct(string $name = null, ExportServiceInterface $exportService, StreamServiceInterface $streamService, ParameterBagInterface $parameterBag)
    {
        parent::__construct($name);
        $this->exportService = $exportService;
        $this->streamService = $streamService;
        $this->parameterBag = $parameterBag;
    }

    /**
     * @throws \Doctrine\DBAL\Exception
     * @throws Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $export = $this->exportService->findNotProcessed();
        $options = $this->filter($export->getFilter());
        $data = $this->streamService->getLogsInRange($export->getTable(), $options);
        $filename = $this->generateExportFilename($export);
        $path = $this->exportService->export($filename, $export->getFormat(), $data);

        if (!empty($path)) {
            $finishedDate = new DateTime();
            $expiryDate = new DateTime($this->parameterBag->get('app.logview.export_expiry'));
            $export->setFinishedAt($finishedDate);
            $export->setExpiredAt($expiryDate);
            $export->setPath($path);

            $this->exportService->createOrUpdate($export);
        }

        $io->success('Done!!!');

        return Command::SUCCESS;
    }

    /**
     * @throws Exception
     */
    private function filter(array $filter): array
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

        if (!empty($to = $filter['to'])) {
            $to = new DateTime($to);
            $options['to'] = $to;
        }

        if (!empty($filterQuery = $filter['filter'])) {
            $options['filter'] = $filterQuery;
        } else {
            $options['filter'] = false;
        }

        return $options;
    }

    /**
     * @param Export $export
     * @return string
     */
    private function generateExportFilename(Export $export): string
    {
        $date = new DateTime();
        return "{$export->getTable()}_{$date->format('Y-m-d_H-i-s')}.{$export->getFormat()}";
    }
}
