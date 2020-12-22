<?php

namespace App\Command;

use App\Entity\User;
use App\Services\User\UserServiceInterface;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateUserCommand extends Command
{
    protected static $defaultName = 'app:createuser';

    /** @var UserServiceInterface */
    private $userService;

    /**
     * @param string|null $name
     * @param UserServiceInterface $userService
     */
    public function __construct(string $name = null, UserServiceInterface $userService)
    {
        parent::__construct($name);
        $this->userService = $userService;
    }

    protected function configure()
    {
        $this
            ->setDescription('This command used to create system user')
            ->addArgument('email', InputArgument::REQUIRED, 'User email')
            ->addOption('password', 'p', InputOption::VALUE_REQUIRED, 'User password')
            ->addOption('firstname', 'f', InputOption::VALUE_REQUIRED, 'User first name')
            ->addOption('lastname', 'l', InputOption::VALUE_REQUIRED, 'User last name')
            ->addOption('user', null, InputOption::VALUE_NONE, 'Create normal user, default is ADMIN')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $email = $input->getArgument('email');
        $firstName = $input->getOption('firstname');
        $lastName = $input->getOption('lastname');
        $isAdmin = !$input->getOption('user');
        $password = $input->getOption('password');

        if (empty($firstName)) {
            $firstName = $isAdmin ? 'Admin' : 'User';
        }
        if (empty($lastName)) {
            $lastName = '';
        }

        $user = new User();
        $user->setIsActive(true);
        $user->setEmail($email);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setIsAdmin($isAdmin);

        try {
            $this->userService->createUser($user, $password);
            $io->success('Done');
            return Command::SUCCESS;
        } catch (UniqueConstraintViolationException $e) {
            $io->error('Email already exist');
            return Command::FAILURE;
        }
    }
}
