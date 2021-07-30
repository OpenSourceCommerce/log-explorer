<?php


namespace App\EventSubscriber;

use App\Events\AlertTriggeredEvent;
use App\Events\UserCreatedEvent;
use App\Services\Mailer\MailerServiceInterface;
use App\Services\User\UserServiceInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AlertTriggeredSubscriber implements EventSubscriberInterface
{
    /**
     * @var MailerServiceInterface
     */
    private $mailerService;

    public function __construct(MailerServiceInterface $mailerService)
    {
        $this->mailerService = $mailerService;
    }

    public function onUserCreated(AlertTriggeredEvent $event): void
    {
        $alert = $event->getAlert();

        $this->mailerService->sendAlertEmail($alert->getSubject(), $alert->getEmail(), [
            'title' => $alert->getTitle(),
            'startedAt' => $event->getTimestamp(),
            'threshold' => $alert->getThreshold(),
            'total' => $event->getTotal(),
        ]);
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            AlertTriggeredEvent::ALERT_TRIGGERED => ['onUserCreated', 100],
        ];
    }
}
