<?php


namespace App\EventSubscriber;

use App\Exceptions\InvalidJsonRequestException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class JsonRequestSubscriber implements EventSubscriberInterface
{

    public function convertJsonStringToArray(ControllerEvent $event): void
    {
        $request = $event->getRequest();
        if($request->isMethod('post'))
        dd($request, $request->isMethod('post'));
        if ($request->getContentType() != 'json' || !$request->getContent()) {
            return;
        }
        $data = json_decode($request->getContent(), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new InvalidJsonRequestException('invalid json body: ' . json_last_error_msg());
        }

        $request->request->replace(is_array($data) ? $data : array());
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => ['convertJsonStringToArray', 100],
        ];
    }
}
