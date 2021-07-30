<?php


namespace App\Events;


use App\Entity\Alert;
use App\Entity\UserToken;
use Symfony\Contracts\EventDispatcher\Event;

class AlertTriggeredEvent extends Event
{
    public const ALERT_TRIGGERED = 'alert.triggered';

    /**
     * @var UserToken
     */
    protected $token;
    /**
     * @var Alert
     */
    private $alert;
    private $timestamp;
    private $total;

    public function __construct(Alert $alert, string $timestamp, int $total)
    {
        $this->alert = $alert;
        $this->timestamp = $timestamp;
        $this->total = $total;
    }

    public function getAlert(): Alert
    {
        return $this->alert;
    }

    public function getTimestamp(): string
    {
        return $this->timestamp;
    }

    public function getTotal(): int
    {
        return $this->total;
    }
}
