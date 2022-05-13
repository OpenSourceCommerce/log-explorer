<?php

namespace App\Command;

use App\Entity\Export;
use App\Services\Export\ExportServiceInterface;
use DateTime;
use Exception;
use Symfony\Component\Console\Command\Command;
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
     * @var ParameterBagInterface
     */
    private $parameterBag;

    protected function configure(): void
    {
        $this->addOption('limit', 'l', InputOption::VALUE_OPTIONAL, 'Limit num of exports to process per time. Default: 1');
    }

    public function __construct(ExportServiceInterface $exportService, ParameterBagInterface $parameterBag, string $name = null)
    {
        parent::__construct($name);
        $this->exportService = $exportService;
        $this->parameterBag = $parameterBag;
    }

    /**
     * @throws \Doctrine\DBAL\Exception
     * @throws Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $limit = $input->getOption('limit');

        if (empty($limit)) {
            $limit = 1;
        }

        $exports = $this->exportService->findNotProcessed($limit);

        if (!empty($exports)) {
            /** @var Export $export */
            foreach ($exports as $export) {
                $path = $this->exportService->export($export);

                if (!empty($path)) {
                    $finishedDate = new DateTime();
                    $expiryDate = new DateTime($this->parameterBag->get('app.logview.export_expiry'));
                    $export->setFinishedAt($finishedDate);
                    $export->setExpiredAt($expiryDate);
                    $export->setPath($path);

                    $this->exportService->createOrUpdate($export);
                }
            }
        }

        $io->success('Done!!!');

        return Command::SUCCESS;
    }
}
