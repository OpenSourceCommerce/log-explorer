<?php

namespace App\Command;

use App\Exceptions\TableExistException;
use App\Services\Database\DatabaseServiceInterface;
use Doctrine\DBAL\Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateDatabaseTableCommand extends Command
{
    protected static $defaultName = 'app:createtable';

    /** @var DatabaseServiceInterface */
    private $databaseService;

    /**
     * @param string|null $name
     * @param DatabaseServiceInterface $databaseService
     */
    public function __construct(DatabaseServiceInterface $databaseService, string $name = null)
    {
        parent::__construct($name);
        $this->databaseService = $databaseService;
    }

    protected function configure()
    {
        $this
            ->setDescription("Create new table.\r\n  Ex: php bin/console app:createtable apache_access -f status:UInt16 -f method:String -f size:UInt16 -f referer:String")
            ->addArgument('name', InputOption::VALUE_REQUIRED, 'Table name')
            ->addOption('fields', 'f', InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY, 'Table column. status:Int16')
            ->addOption('ttl', 't', InputOption::VALUE_OPTIONAL, "Time to life {column_name}:{interval}:{type}\r\nEx: timestamp:3:month -> \"TTL timestamp + INTERVAL 3 MONTH\"");
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('name');
        $fields = $input->getOption('fields');
        $ttl = $input->getOption('ttl');

        $options = [];
        $columns = [
            '_id' => ['name' => '_id', 'type' => 'UUID'],
        ];

        try {
            foreach ($fields as $field) {
                list($columnName, $columnType) = explode(':', $field);
                $columns[$columnName] = ['name' => $columnName, 'type' => $columnType];
            }

            $columns = array_values($columns);

            if (!empty($ttl)) {
                list($ttlColumn, $ttlNumber, $ttlType) = explode(':', $ttl);
                $ttlType = strtoupper($ttlType);
                $options['ttl'] = "{$ttlColumn} + INTERVAL {$ttlNumber} {$ttlType}";
            }

            $this->databaseService->createTable($name, $columns, $options);
        } catch (TableExistException $e) {
            $io->success("Table exist.");
            return Command::SUCCESS;
        } catch (Exception $e) {
            $io->error("Not success\r\n{$e->getMessage()}\r\n{$e->getTraceAsString()}");
            return Command::FAILURE;
        }
        $io->success('Done');
        return Command::SUCCESS;
    }
}
