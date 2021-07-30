<?php

namespace App\Command;

use App\Entity\Alert;
use App\Services\Alert\AlertServiceInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class AlertsRunCommand extends Command
{
    protected static $defaultName = 'app:alerts:run';
    protected static $defaultDescription = 'Execute Alerts. Ex: php bin/console app:alerts:run';
    /**
     * @var AlertServiceInterface
     */
    private $alertService;

    protected function configure(): void
    {
        $this->addOption('limit', 'l', InputOption::VALUE_OPTIONAL, 'Limit num of queries will be executed per time. Default: 5');
    }

    public function __construct(string $name = null, AlertServiceInterface $alertService)
    {
        parent::__construct($name);
        $this->alertService = $alertService;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $limit = $input->getOption('limit');

        if (empty($limit)) {
            $limit = 5;
        }

        $total = 0;

        do {
            $alerts = $this->alertService->findAvailableAlerts($limit);

            /** @var Alert $alert */
            foreach ($alerts as $alert) {
                $this->alertService->execute($alert);
                $total++;
                $io->note("{$alert->getTitle()} has been executed");
            }
        } while (!empty($alerts));

        $io->success("{$total} alerts have been done!!");

        return Command::SUCCESS;
    }
}
