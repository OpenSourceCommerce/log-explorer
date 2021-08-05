<?php


namespace App\Services\Stream;


use App\Entity\Dashboard;
use App\Entity\GraphLine;
use App\Services\Clickhouse\Connection;
use App\Widget\WidgetInterface;
use Doctrine\DBAL\Query\QueryBuilder;

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
        $filter = $options['filter'] ?? false;
        $builder = $this->connection->createQueryBuilder()
            ->from($table);
        if ($timer) {
            $this->makeTimeFilter($builder, $from, $to);
        }
        if ($filter) {
            $builder->andWhere($filter);
        }
        return $builder;
    }

    private function makeTimeFilter(QueryBuilder $builder, $from, $to): QueryBuilder
    {
        if ($from) {
            $builder->andWhere('timestamp >= :from')
                ->setParameter('from', $from->format('Y-m-d H:i:s'));
        }
        if ($to) {
            $builder->andWhere('timestamp <= :to')
                ->setParameter('to', $to->format('Y-m-d H:i:s'));
        }
        return $builder;
    }

    /**
     * @inheritDoc
     */
    public function trackIdLog(string $trackId): string
    {
        return '/*LE-TRACK-ID-' . $trackId . '*/';
    }

    /**
     * @inheritDoc
     */
    public function getLogsInRange(string $table, array $options = [])
    {
        $builder = $this->makeQueryBuilder($table, $options);
        $limit = $options['limit'] ?? 100;
        $timer = $options['timer'] ?? 'timestamp';
        $sort = $options['sort'] ?? $timer;
        $order = strtoupper($options['order'] ?? 'DESC');
        $page = $options['page'] ?? 1;
        $columns = $options['columns'] ?? '*';

        $trackId = $options['trackId'] ?? '';
        $track = '';
        if ($trackId) {
            $track = $this->trackIdLog($trackId);
        }

        $builder->select('_id')
            ->orderBy($sort, $order)
            ->setFirstResult(($page - 1) * $limit);

        $builder2 = $this->connection->createQueryBuilder()
            ->from($table)
            ->select($columns)
            ->orderBy($sort, $order)
            ->where('_id IN (' . $builder->getSQL() . ')');

        if ($limit > 0) {
            $builder->setMaxResults($limit);
            $builder2->setMaxResults($limit);
        }

        return $this->connection->fetchAll($builder2->getSQL() . ' FORMAT JSON ' . $track, $builder->getParameters());
    }

    /**
     * @inheritDoc
     */
    public function getLogByTrackId(string $trackId)
    {
        $track = $this->trackIdLog($trackId);
        $this->connection->exec('SYSTEM FLUSH LOGS');
        $sql = "SELECT * FROM system.query_log WHERE type = 'QueryFinish' AND query LIKE '%{$track}'";
        return $this->connection->fetchColumn($sql);
    }

    /**
     * @inheritDoc
     */
    public function getLogSummaryInRange(string $table, string $column, array $options = [])
    {
        $builder = $this->makeQueryBuilder($table, $options);
        $builder->addSelect($column, "COUNT({$column}) AS c")
            ->addGroupBy($column);
        $ret = $builder->execute()
            ->fetchAll();
        $summary = [];
        if ($ret) {
            foreach ($ret as $item) {
                $summary[] = [
                    'label' => $item[$column],
                    'value' => intval($item['c']),
                ];
            }
        }
        return $summary;
    }

    /**
     * @inheritDoc
     */
    public function getGraphOffsetInSeconds(\DateTimeInterface $from, \DateTimeInterface $to, int $numOfPoint): int
    {
        $timeOffset = $from->diff($to);
        $seconds = $timeOffset->days * 86400 + $timeOffset->h * 3600 + $timeOffset->i * 60 + $timeOffset->s;
        return intval(ceil($seconds / $numOfPoint));
    }

    /**
     * @inheritDoc
     */
    public function getLogGraphInRange(string $table, GraphLine $line, int $offsetInSeconds, array $options = []): array
    {
        $data = [];
        $from = $options['from'];
        $to = $options['to'] ?? new \DateTime();
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
            if ($line->getFilter()) {
                $builder->andWhere($line->getFilter());
            }
            $data[] = [
                $label->getTimestamp() * 1000,
                intval($builder->execute()->fetchColumn()),
            ];
            $lastPoint = $nextPoint;
        }
        return $data;
    }

    /**
     * @inheritDoc
     */
    public function getTotalLogsInRange(string $name, array $options = [])
    {
        $builder = $this->makeQueryBuilder($name, $options);
        return $builder->select('COUNT()')
            ->execute()
            ->fetchColumn();
    }

    /**
     * @inheritDoc
     */
    public function getWidgetData(Dashboard $dashboard, WidgetInterface $widgetItem, array $options = [])
    {
        $from = $options['from'] ?? false;
        $to = $options['to'] ?? false;
        $filter = $options['filter'] ?? false;

        $builder = $widgetItem->getQueryBuilder();
        if ($dashboard->getQuery()) {
            $builder->andWhere($dashboard->getQuery());
        }
        $this->makeTimeFilter($builder, $from, $to);
        if ($filter) {
            $builder->andWhere($filter);
        }
        if ($widgetItem->hasSingleResult()) {
            return $builder
                ->execute()
                ->fetchColumn();
        } else {
            return $builder
                ->execute()
                ->fetchAll();
        }
    }
}
