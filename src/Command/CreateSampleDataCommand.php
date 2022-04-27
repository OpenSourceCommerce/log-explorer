<?php

namespace App\Command;

use App\Services\Sample\SampleServiceInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateSampleDataCommand extends Command
{
    protected static $defaultName = 'app:createsampledata';
    /** @var SampleServiceInterface */
    private $sampleService;

    /**
     * @param string|null $name
     * @param SampleServiceInterface $sampleService
     */
    public function __construct(SampleServiceInterface $sampleService, string $name = null)
    {
        parent::__construct($name);
        $this->sampleService = $sampleService;
    }

    protected function configure()
    {
        $this
            ->setDescription('Create sample data')
            ->addArgument('number', InputArgument::REQUIRED, 'Number of row in database')
            ->addOption('date', null, InputOption::VALUE_REQUIRED, 'At date', (new \DateTime())->format('Y-m-d'))
            ->addOption('time', null, InputOption::VALUE_REQUIRED, 'At special time')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $number = $input->getArgument('number');
        $date = $input->getOption('date');
        $time = $input->getOption('time');

        if ($time) {
            $this->sampleService->createDataAt(new \DateTime("{$date} {$time}"), $number);
        } else {
            $fromDate = new \DateTime($date.' 00:00:00');
            $toDate = new \DateTime();
            $diff = $fromDate->diff($toDate);
            $inSeconds = $diff->days * 24 * 3600 + $diff->h * 3600 + $diff->i * 60 + $diff->s;
            $range = [];
            for ($i = 0; $i < $number; $i++) {
                $range[] = random_int(0, $inSeconds);
            }
            rsort($range);
            foreach ($range as $s) {
                $at = new \DateTime("- {$s} seconds");
                $this->sampleService->createDataAt($at, 1);
            }
        }

        $io->success('Done');

        return Command::SUCCESS;
    }
}
