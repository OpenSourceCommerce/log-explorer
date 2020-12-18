<?php


namespace App\Services\Column;


use App\Entity\Column;
use App\Entity\Table;
use App\Repository\ColumnRepository;
use Doctrine\ORM\EntityManagerInterface;

class ColumnService implements ColumnServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    private function getRepository(): ColumnRepository
    {
        return $this->em->getRepository(Column::class);
    }

    /**
     * @inheritDoc
     */
    public function create(Table $table, array $data, $flush = true): Column
    {
        $column = new Column();
        $column->setTable($table);
        $column->setName($data['name']);
        $column->setTitle($data['title']);
        $column->setType($data['type']);

        $this->save($column, $flush);

        return $column;
    }

    private function save(Column $column, bool $flush = true)
    {
        $this->em->persist($column);
        if ($flush) {
            $this->em->flush();
        }

        return $column;
    }

    /**
     * @inheritDoc
     */
    public function findByName(Table $table, string $name): ?Column
    {
        return $this->getRepository()->findOneBy([
            'table' => $table,
            'name' => $name
        ]);
    }

    /**
     * @inheritDoc
     */
    public function updateColumn(Column $column, array $data, bool $flush = true): Column
    {
        if ($data['title']) {
            $column->setTitle($data['title']);
        }
        if ($data['type']) {
            $column->setType($data['type']);
        }
        $this->save($column, $flush);

        return $column;
    }

    /**
     * @inheritDoc
     */
    public function removeNotIn(Table $table, array $columnNames): bool
    {
        return $this->getRepository()->removeNotIn($table, $columnNames);
    }

    /**
     * @inheritDoc
     */
    public function findById($id): ?Column
    {
        return $this->getRepository()->find($id);
    }

    /**
     * @inheritDoc
     */
    public function findIn(array $ids): array
    {
        return $this->getRepository()->findIn($ids);
    }
}
