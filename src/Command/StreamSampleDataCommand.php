<?php

namespace App\Command;

use App\Services\Sample\SampleServiceInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class StreamSampleDataCommand extends Command
{
    protected static $defaultName = 'app:streamsampledata';
    /** @var SampleServiceInterface */
    private $sampleService;

    /**
     * @param string|null $name
     * @param SampleServiceInterface $sampleService
     */
    public function __construct(string $name = null, SampleServiceInterface $sampleService)
    {
        parent::__construct($name);
        $this->sampleService = $sampleService;
    }

    protected function configure()
    {
        $this
            ->setDescription('Add sample data')
            ->addArgument('number', InputArgument::REQUIRED, 'Number of request per-minute')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $number = $input->getArgument('number');

        $numberPerSecond = intval(floor($number / 60));
        $firstSeconds = $number % 60;
        $lastSecond = null;

        while (true) {
            do {
                $now = new \DateTime();
                $second = intval($now->format('s'));
                usleep(1000);
            } while ($second === $lastSecond);
            if (is_null($lastSecond)) {
                $diff = 1;
            } else {
                $diff = $second > $lastSecond ? $second - $lastSecond : $second + 60 - $lastSecond;
            }
            $newRow = 0;
            for ($i = 0; $i < $diff; $i++) {
                $tmpSecond = ($lastSecond + $i + 1) % 60;
                $newRow += $numberPerSecond;
                if ($tmpSecond < $firstSeconds) {
                    $newRow += 1;
                }
            }
            $lastSecond = $second;
            $io->comment($now->format('Y-m-d H:i:s'). " {$diff} add {$newRow}");
            $this->sampleService->createDataAt($now, $newRow);
        }

        $io->success('Done.');

        return Command::SUCCESS;
    }
}
