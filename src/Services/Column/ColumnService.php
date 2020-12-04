<?php


namespace App\Services\Column;


use App\Entity\Column;
use App\Entity\Table;
use Doctrine\ORM\EntityManagerInterface;

class ColumnService implements ColumnServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @inheritDoc
     */
    public function create(Table $table, array $data, $flush = true)
    {
        $column = new Column();
        $column->setTable($table);
        $column->setName($data['name']);
        $column->setType($data['type']);
        $column->setTitle($data['title']);

        $this->em->persist($column);
        if ($flush) {
            $this->em->flush();
        }
        return $column;
    }

    private function save(Column $column)
    {
        $this->em->persist($column);
        $this->em->flush();

        return $column;
    }
}
