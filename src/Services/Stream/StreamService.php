<?php


namespace App\Services\Stream;


use App\Services\Clickhouse\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\Query\Expr;
use Symfony\Component\Validator\Constraints\DateTime;

class StreamService implements StreamServiceInterface
{
    /** @var Connection */
    private $connection;

    /**
     * StreamService constructor.
     * @param Connection $connection
     */
    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @param string $table
     * @param array $options
     * @return QueryBuilder
     */
    private function makeQueryBuilder(string $table, array $options = [])
    {
        $timer = $options['timer'] ?? 'timestamp';
        $from = $options['from'] ?? null;
        $fromOperator = $options['fromOperator'] ?? '>=';
        $to = $options['to'] ?? null;
        $filters = $options['filters'] ?? [];
        $builder = $this->connection->createQueryBuilder()
            ->from($table);
        if ($timer) {
            if ($from) {
                $builder->andWhere($timer . ' ' . $fromOperator . ' :from')
                    ->setParameter('from', $from->format('Y-m-d H:i:s'));
            }
            if ($to) {
                $builder->andWhere($timer . ' <= :to')
                    ->setParameter('to', $to->format('Y-m-d H:i:s'));
            }
        }
        if ($filters) {
            foreach ($filters as $filter) {
                $builder->andWhere($filter);
            }
        }
        return $builder;
    }

    /**
     * @inheritDoc
     */
    public function getLogsInRange(string $table, \DateTimeInterface $from, array $options = [])
    {
        $options['from'] = $from;
        $builder = $this->makeQueryBuilder($table, $options);
        $limit = $options['limit'] ?? 30;
        $timer = $options['timer'] ?? 'timestamp';
        $sort = $options['sort'] ?? $timer;
        $order = $options['order'] ?? 'DESC';
        $columns = $options['columns'] ?? '*';
        $builder->select($columns)
            ->setMaxResults($limit);
        if ($sort) {
            $builder->orderBy($sort, $order);
        }
        return $builder->execute()
            ->fetchAll();
    }

    /**
     * @inheritDoc
     */
    public function getLogSummaryInRange(string $table, string $column, \DateTimeInterface $from, array $options = [])
    {
        $options['from'] = $from;
        $builder = $this->makeQueryBuilder($table, $options);
        $builder->addSelect($column, "COUNT({$column}) AS c")
                ->addGroupBy($column);
        $ret = $builder->execute()
            ->fetchAll();
        $summary = [];
        if ($ret) {
            foreach ($ret as $item) {
                $summary[$item[$column]] = intval($item['c']);
            }
        }
        return $summary;
    }

    /**
     * @inheritDoc
     */
    public function getGraphOffsetInSeconds(\DateTimeInterface $from, \DateTimeInterface $to, int $numOfPoint)
    {
        $timeOffset = $from->diff($to);
        $seconds = $timeOffset->days * 86400 + $timeOffset->h * 3600 + $timeOffset->i * 60 + $timeOffset->s;
        return intval(ceil($seconds / $numOfPoint));
    }

    /**
     * @inheritDoc
     */
    public function getLogGraphInRange(string $table, array $column, \DateTimeInterface $from, int $offsetInSeconds, array $options = [])
    {
        $data = [];
        $to = $options['to'] ?? new DateTime();
        /** @var \DateTime $lastPoint */
        $lastPoint = $from;
        $fromOperator = '>=';
        while ($lastPoint < $to) {
            $options['fromOperator'] = $fromOperator;
            $nextPoint = clone $lastPoint;
            $label = clone $lastPoint;
            if ($lastPoint === $from) {
                $offset = intval(round($offsetInSeconds / 2));
                $fromOperator = '>'; // make sure do not count multiple time
            } else {
                $offset = $offsetInSeconds;
            }
            $nextPoint->modify("+{$offset} seconds");
            $offset = round($offset / 2);
            $label->modify("+{$offset} seconds");
            if ($label > $to) {
                $label = $to;
            }
            $options['from'] = $lastPoint;
            $options['to'] = $nextPoint;
            $builder = $this->makeQueryBuilder($table, $options)
                ->addSelect('COUNT() AS c');
            if (is_array($column['value'])) {
                $builder->andWhere((new Expr())->in('status', $column['value']));
            } else {
                $builder->andWhere('status=:status')
                    ->setParameter('status', $column['value']);
            }
            $data[] = [
                $label->format('H:i'),
                intval($builder->execute()->fetchColumn()),
            ];
            $lastPoint = $nextPoint;
        }
        return $data;
    }
}
