<?php

namespace App\Command;

use App\Exceptions\TableExistException;
use App\Services\Database\DatabaseServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateSampleDatabaseCommand extends Command
{
    protected static $defaultName = 'app:createsampledatabase';

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
            ->setDescription('This command used to create the sample database at ClickHouse')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        try {
            $this->databaseService->createTable('nginx_access', [
                ['name' => 'ip', 'title' => 'IP', 'type' => 'String'],
                ['name' => 'customer', 'title' => 'Customer', 'type' => 'String'],
                ['name' => 'timestamp', 'title' => 'Time', 'type' => 'DateTime'],
                ['name' => 'url', 'title' => 'URL', 'type' => 'String'],
                ['name' => 'status', 'title' => 'Status', 'type' => 'UInt16'],
                ['name' => 'body_bytes_sent', 'title' => 'Size', 'type' => 'UInt64'],
                ['name' => 'referer', 'title' => 'Referer', 'type' => 'String'],
                ['name' => 'user_agent', 'title' => 'Agent', 'type' => 'String'],
            ]);
        } catch (TableExistException $e) {
            $io->success("Table exist.");
            return Command::SUCCESS;
        } catch (Exception $e) {
            dd($e);
            $io->error("Not success");
            return Command::FAILURE;
        }
        $io->success('Done');
        return Command::SUCCESS;
    }
}
