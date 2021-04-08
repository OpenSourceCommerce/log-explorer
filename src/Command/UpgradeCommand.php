<?php

namespace App\Command;

use App\Services\Database\DatabaseServiceInterface;
use App\Services\LogView\LogViewServiceInterface;
use Doctrine\DBAL\Exception as DBALException;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class UpgradeCommand extends Command
{
    protected static $defaultName = 'app:upgrade';

    /** @var DatabaseServiceInterface */
    private $databaseService;
    /** @var LogViewServiceInterface */
    private $logViewService;

    /**
     * @param string|null $name
     * @param DatabaseServiceInterface $databaseService
     * @param LogViewServiceInterface $logViewService
     */
    public function __construct(string $name = null, DatabaseServiceInterface $databaseService, LogViewServiceInterface $logViewService)
    {
        parent::__construct($name);
        $this->databaseService = $databaseService;
        $this->logViewService = $logViewService;
    }

    protected function configure()
    {
        $this
            ->setDescription('This command used to upgrade exiting database table structure by the newest version')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $logViews = $this->logViewService->list();
        foreach ($logViews as $logView) {
            try {
                $this->databaseService->upgradeTable($logView->getTable());
            } catch (DBALException $e) {
                $io->error("Can not upgrade for table {$logView->getTable()}");
                return Command::FAILURE;
            } catch (\LogicException $e) {
                $io->error($e->getMessage());
                return Command::FAILURE;
            }
        }
        $io->success("DONE");
        return Command::SUCCESS;
    }
}
