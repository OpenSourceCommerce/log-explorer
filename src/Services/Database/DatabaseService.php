<?php


namespace App\Services\Database;


use App\Exceptions\InvalidSqlQueryException;
use App\Exceptions\TableExistException;
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
    public function processQuery(string $query): bool
    {
        list($table, $columns, $sql) = $this->analysis($query);
        if ($this->connection->tableExists($table)) {
            throw new TableExistException();
        }
        if ($this->tableService->isTableExist($table)) {
            throw new TableExistException();
        }

        if (!$this->connection->exec($sql)) {
            return false;
        }

        $mTable = $this->tableService->createTable($table, false);
        foreach ($columns as $column) {
            $this->columnService->create($mTable, $column, false);
        }
        $this->em->flush();

        return true;
    }

    /**
     * @param string $query
     * @return array
     * @throws InvalidSqlQueryException
     */
    private function analysis(string $query): array
    {
        $query = str_replace("\n", ' ', $query);
        $query = trim(preg_replace('([\s]+)', ' ', $query));
        $columns = [];

        // table
        if (preg_match('#^CREATE TABLE( IF NOT EXIST)? (\w+) \(#i', $query, $matches)) {
            $table = $matches[2];
            $sql = $matches[0];
            $query = ltrim(preg_replace('#^CREATE TABLE( IF NOT EXIST)? (\w+) \(#i', '', $query));
        } else {
            throw new InvalidSqlQueryException();
        }

        // columns
        while ($query) {
            $matches = [];
            if (!preg_match('#^`(\w+)` (\w+)#', $query, $matches)) {
                throw new InvalidSqlQueryException();
            }
            $name = $matches[1];
            $type = $matches[2];
            $title = '';

            $pos = strpos($query, ',');
            if ($pos !== false) {
                $sql .= substr($query, 0, $pos + 1);
                $query = ltrim(substr($query, $pos + 1));

                if (substr($query, 0, 1) === '#') {
                    $pos = strpos($query, '`');
                    if ($pos === false) {
                        throw new InvalidSqlQueryException();
                    }
                    $title = trim(substr($query, 1, $pos - 1));
                    $query = ltrim(substr($query, $pos));
                }
            } else {
                // the last column
                $pos = strpos($query, ')');
                if ($pos === false) {
                    throw new InvalidSqlQueryException();
                }
                $titlePos = strpos($query, '#');
                if ($titlePos !== false && $titlePos < $pos) {
                    $title = trim(substr($query, $titlePos + 1, $pos - $titlePos - 1));
                    $sql .= substr($query, 0, $titlePos - 1);
                    $sql .= substr($query, $pos);
                } else {
                    $sql .= $query;
                }
                $query = '';
            }
            if (empty($title)) {
                $title = ucfirst($name);
                $title = str_replace('_', ' ', $title);
            }
            $columns[] = [
                'name' => $name,
                'type' => $type,
                'title' => $title,
            ];
        }
        return [$table, $columns, $sql];
    }
}
