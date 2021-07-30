<?php


namespace App\Services\Alert;


use App\Entity\Alert;
use App\Events\AlertTriggeredEvent;
use App\Repository\AlertRepository;
use App\Services\Clickhouse\ConnectionInterface;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

class AlertService implements AlertServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;
    /**
     * @var ConnectionInterface
     */
    private $connection;
    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;
    /**
     * @var ParameterBagInterface
     */
    private $parameterBag;

    public function __construct(EntityManagerInterface   $em,
                                ConnectionInterface      $connection,
                                EventDispatcherInterface $dispatcher,
                                ParameterBagInterface    $parameterBag)
    {
        $this->em = $em;
        $this->connection = $connection;
        $this->dispatcher = $dispatcher;
        $this->parameterBag = $parameterBag;
    }

    /**
     * @return AlertRepository
     */
    private function getRepository(): ObjectRepository
    {
        return $this->em->getRepository(Alert::class);
    }

    /**
     * @inheritDoc
     */
    public function findAll()
    {
        return $this->getRepository()->findAll();
    }

    /**
     * @inheritDoc
     */
    public function createOrUpdate(Alert $alert): Alert
    {
        return $this->saveAlert($alert);
    }

    /**
     * @inheritDoc
     */
    public function delete(Alert $alert): bool
    {
        $this->em->remove($alert);
        $this->em->flush();

        return true;
    }

    /**
     * @inheritDoc
     */
    public function updateStatus(Alert $alert): Alert
    {
        $alert->setIsActive(!$alert->getIsActive());
        return $this->saveAlert($alert);
    }

    /**
     * @inheritDoc
     */
    public function findAvailableAlerts(?int $limit)
    {
        return $this->getRepository()->findAvailableAlerts($limit);
    }

    /**
     * @inheritDoc
     */
    public function execute(Alert $alert)
    {
        $timeRange = $alert->getTimeRange();
        $params = $this->convertTimeRange($timeRange);

        $query = <<<SQL
SELECT COUNT(*) as total
FROM {$alert->getFromTable()}
WHERE {$alert->getQuery()}
AND `timestamp` BETWEEN ? AND ?
SQL;

        $result = $this->connection->fetchColumn($query, $params);
        $total = 0;

        if (!empty($result['total'])) {
            $total = $result['total'];
        }

        if ($total >= $alert->getThreshold()) {
            $interval = "{$alert->getIntervalTime()} minutes";
            $event = new AlertTriggeredEvent($alert, date('Y-m-d H:i:s'), $total);
            $this->dispatcher->dispatch($event, AlertTriggeredEvent::ALERT_TRIGGERED);
        } else {
            $interval = "{$this->parameterBag->get('app.alert.regular_interval')} minutes";
        }

        $nextRun = (new \DateTime())->add(\DateInterval::createFromDateString($interval));

        $alert->setNextRunAt($nextRun);

        return $this->saveAlert($alert);
    }

    /**
     * @param $timeRange
     * @return array|null[]
     */
    private function convertTimeRange($timeRange): array
    {
        list($type, $from, $to) = explode('|', $timeRange);
        $now = new \DateTime();

        switch ($type) {
            case '1 hour':
            case '12 hours':
            case '1 day':
            case '7 days':
                $to = $now;
                $from = (clone $now)->sub(\DateInterval::createFromDateString("{$type}"));
                break;
            case 'Today':
                $to = $now;
                $now->setTime(23, 59, 59);
                $from = (clone $now)->setTime(0, 0, 0);
                break;
            case 'Yesterday':
                $to = (clone $now)->sub(\DateInterval::createFromDateString("1 days"))->setTime(23, 59, 59);
                $from = (clone $to)->setTime(0, 0, 0);
                break;
            case 'This Month':
                $to = \DateTime::createFromFormat("Y-m-d H:i:s", "{$now->format('Y-m-t')} 23:59:59");
                $from = \DateTime::createFromFormat("Y-m-d H:i:s", "{$now->format('Y-m')}-01 00:00:00");
                break;
            case 'Last Month':
                $now->sub(\DateInterval::createFromDateString("1 months"));
                $to = \DateTime::createFromFormat("Y-m-d H:i:s", "{$now->format('Y-m-t')} 23:59:59");
                $from = \DateTime::createFromFormat("Y-m-d H:i:s", "{$now->format('Y-m')}-01 00:00:00");
                break;
            case 'Custom Range':
                if (is_numeric($from) && is_numeric($to)) {
                    $from = (new \DateTime())->setTimestamp($from);
                    $to = (new \DateTime())->setTimestamp($to);
                }
                break;
        }

        if ($from instanceof \DateTime && $to instanceof \DateTime) {
            return [
                $from->format("Y-m-d H:i:s"),
                $to->format("Y-m-d H:i:s"),
            ];
        }

        return [null, null];
    }

    /**
     * @param Alert $alert
     * @return Alert
     */
    private function saveAlert(Alert $alert): Alert
    {
        $this->em->persist($alert);
        $this->em->flush();

        return $alert;
    }
}
