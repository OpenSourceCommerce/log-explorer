<?php


namespace App\Services\Table;


use App\Entity\Table;
use App\Repository\TableRepository;
use Doctrine\ORM\EntityManagerInterface;

class TableService implements TableServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    private function getRepository(): TableRepository
    {
        return $this->em->getRepository(Table::class);
    }

    /**
     * @inheritDoc
     */
    public function isTableExist(string $name)
    {
        return $this->getRepository()->isTableExist($name);
    }

    /**
     * @inheritDoc
     */
    public function createTable(string $name, $flush = true)
    {
        $table = new Table();
        $table->setName($name);
        $this->em->persist($table);
        if ($flush) {
            $this->em->flush();
        }
        return $table;
    }

    private function save(Table $table)
    {
        $this->em->persist($table);
        $this->em->flush();

        return $table;
    }

    /**
     * @inheritDoc
     */
    public function getTableByName(string $tableName): ?Table
    {
        return $this->getRepository()->findOneBy(['name' => $tableName]);
    }

    /**
     * @inheritDoc
     */
    public function getAllTable(): array
    {
        return $this->getRepository()->findAll();
    }
}
