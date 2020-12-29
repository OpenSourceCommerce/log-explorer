<?php

namespace App\Command;

use App\Services\Database\DatabaseServiceInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class DeleteSampleDatabaseCommand extends Command
{
    protected static $defaultName = 'app:deletesampledatabase';

    /** @var DatabaseServiceInterface */
    private $databaseService;

    /**
     * @param string|null $name
     * @param DatabaseServiceInterface $databaseService
     */
    public function __construct(string $name = null, DatabaseServiceInterface $databaseService)
    {
        parent::__construct($name);
        $this->databaseService = $databaseService;
    }

    protected function configure()
    {
        $this
            ->setDescription('This command used to delete the sample database at ClickHouse')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $this->databaseService->dropTableIfExist('nginx_access');

        $io->success('Done');
        return Command::SUCCESS;
    }
}
