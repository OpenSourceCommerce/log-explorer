<?php

namespace App\Command;

use App\Services\Clickhouse\Connection;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateSampleDatabaseCommand extends Command
{
    protected static $defaultName = 'app:createsampledatabase';
    /** @var Connection */
    private $connection;

    /**
     * @param string|null $name
     * @param Connection $connection
     */
    public function __construct(string $name = null, Connection $connection)
    {
        parent::__construct($name);
        $this->connection = $connection;
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

        $em = $this->connection->getSchemaManager();
        if ($em->tablesExist('nginx_access')) {
            $io->success("Table exist.");
            return Command::SUCCESS;
        }

        $sql = "CREATE TABLE IF NOT EXISTS logs.nginx_access
(
    `ip` String,
    `customer` String,
    `timestamp` DateTime,
    `url` String,
    `status` UInt16,
    `body_bytes_sent` UInt64,
    `referer` String,
    `user_agent` String
)
ENGINE = MergeTree
PARTITION BY (toYYYYMM(timestamp), customer)
ORDER BY timestamp
SETTINGS index_granularity = 8192";

        if ($this->connection->exec($sql)) {
            $io->success('Done');
            return Command::SUCCESS;
        } else {
            $io->error("Not success");
            return Command::FAILURE;
        }
    }
}
