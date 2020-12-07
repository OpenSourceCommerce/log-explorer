<?php


namespace App\Services\Database;


use App\Exceptions\InvalidSqlQueryException;
use App\Services\Clickhouse\Connection;
use App\Services\Column\ColumnServiceInterface;
use App\Services\Table\TableServiceInterface;
use Doctrine\ORM\EntityManagerInterface;

class DatabaseService implements DatabaseServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var Connection */
    private $connection;
    /** @var TableServiceInterface */
    private $tableService;
    /** @var ColumnServiceInterface */
    private $columnService;

    public function __construct(
        EntityManagerInterface $em,
        Connection $connection,
        TableServiceInterface $tableService,
        ColumnServiceInterface $columnService
    )
    {
        $this->em = $em;
        $this->connection = $connection;
        $this->tableService = $tableService;
        $this->columnService = $columnService;
    }

    /**
     * @inheritDoc
     */
    public function processQuery(string $query)
    {
        $tableName = $this->getTableFromQuery($query);
        if (empty($tableName)) {
            throw new InvalidSqlQueryException();
        }
        if (!$this->connection->exec($query)) {
            return false;
        }
        $clickhouseColumns = $this->connection->getColumns($tableName);

        $table = $this->tableService->getTableByName($tableName);
        $isExist = true;
        if (is_null($table)) {
            $table = $this->tableService->createTable($table, false);
            $isExist = false;
        }

        $columnNames = [];
        foreach ($clickhouseColumns as $clickhouseColumn) {
            $column = null;
            $name = $clickhouseColumn->getName();
            $title = $clickhouseColumn->getComment();
            if (empty($title)) {
                $title = ucfirst($name);
                $title = str_replace('_', ' ', $title);
            }
            if ($isExist) {
                $columnNames[] = $name;
                $column = $this->columnService->findByName($table, $name);
                if (!empty($column) && $column->getTitle() !== $title) {
                    $this->columnService->updateColumn($column, ['title' => $title], false);
                }
            }
            if (empty($column)) {
                $this->columnService->create(
                    $table, [
                        'name' => $name,
                        'title' => $title
                    ],
                    false
                );
            }
        }
        if ($isExist) {
            $this->columnService->removeNotIn($table, $columnNames);
        }
        $this->em->flush();

        return $table;
    }

    private function getTableFromQuery(string $query): ?string
    {
        $matches = [];
        if (preg_match('#^CREATE TABLE( IF NOT EXISTS)? ([\w\.]+)( ON CLUSTER [\w\.]+)?(\s)?\(#i', $query, $matches)) {
            return $matches[2];
        } elseif (preg_match('#^ALTER TABLE (\w+) #i', $query, $matches)) {
            return $matches[1];
        }
        return null;
    }
}
