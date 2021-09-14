<?php

namespace App\Command;

use App\Services\Export\ExportServiceInterface;
use App\Services\User\UserServiceInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class LogviewExportDeleteCommand extends Command
{
    protected static $defaultName = 'logview:export-delete';
    protected static $defaultDescription = 'Delete the logview export.';
    /**
     * @var ExportServiceInterface
     */
    private $exportService;
    /**
     * @var UserServiceInterface
     */
    private $userService;

    protected function configure(): void
    {
        $this
            ->addOption('id', 'i', InputOption::VALUE_REQUIRED, 'Id of the export')
            ->addOption('user', 'u', InputOption::VALUE_REQUIRED,
                'User\'s ID or Email. Delete all the exports of an user')
            ->addOption('all', null, InputOption::VALUE_NONE, 'Delete all the exports');
    }

    public function __construct(
        string $name = null,
        ExportServiceInterface $exportService,
        UserServiceInterface $userService
    ) {
        parent::__construct($name);
        $this->exportService = $exportService;
        $this->userService = $userService;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $id = $input->getOption('id');
        $user = $input->getOption('user');
        $all = $input->getOption('all');
        $quiet = $input->getOption('quiet');


        if (empty($id) && empty($user) && empty($all)) {
            $io->error('Please provide at least one of these options: [id, user or all]');

            return Command::FAILURE;
        }

        if (!empty($all)) {
            $confirm = $io->confirm("Do you want to delete all the exports in the database?", $quiet);

            if ($confirm) {
                do {
                    $limit = 10;
                    $exports = $this->exportService->findExports($limit);

                    $this->exportService->removeExports($exports);
                } while (!empty($exports));
            }
        } else {
            if (!empty($id)) {
                $export = $this->exportService->findById($id);

                if (!empty($export)) {
                    $this->exportService->removeExport($export);
                } else {
                    $io->error("ID \"{$id}\" not found");

                    return Command::FAILURE;
                }
            }

            if (!empty($user)) {
                if (is_numeric($user)) {
                    $userEntity = $this->userService->find($user);
                } else {
                    $userEntity = $this->userService->findByEmail($user);
                }

                if (!empty($userEntity)) {
                    $this->exportService->removeExports($userEntity->getExports());
                } else {
                    $io->error("User \"{$user}\" not found");

                    return Command::FAILURE;
                }
            }
        }

        $io->success('Done!!!');

        return Command::SUCCESS;
    }
}
