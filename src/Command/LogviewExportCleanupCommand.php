<?php

namespace App\Command;

use App\Entity\Export;
use App\Services\Export\ExportServiceInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class LogviewExportCleanupCommand extends Command
{
    protected static $defaultName = 'logview:export-cleanup';
    protected static $defaultDescription = 'Clean up all expired exports';
    /**
     * @var ExportServiceInterface
     */
    private $exportService;

    protected function configure(): void
    {
        $this
            ->addOption('limit', 'l', InputOption::VALUE_NONE, 'Limit exports to delete. 0 is unlimited. Default: 0');
    }

    public function __construct(ExportServiceInterface $exportService, string $name = null)
    {
        parent::__construct($name);
        $this->exportService = $exportService;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $limit = $input->getOption('limit');

        if (empty($limit) || !is_numeric($limit) || $limit < 0) {
            $limit = 0;
        }

        $expiredExports = $this->exportService->findExpiredExports($limit);

        if (!empty($expiredExports)) {
            /** @var Export $export */
            foreach ($expiredExports as $export) {
                $this->exportService->removeExport($export);
            }

            $io->success(count($expiredExports) . " exports have been deleted");
        } else {
            $io->note("No expired exports found");
        }

        return Command::SUCCESS;
    }
}
