<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Exception\SessionNotFoundException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class RequestSubscriber implements EventSubscriberInterface
{
    use TargetPathTrait;

    /** @var SessionInterface */
    private $session;
    /** @var Security */
    private $security;
    /** @var UrlGeneratorInterface */
    private $urlGenerator;

    public function __construct(RequestStack $requestStack, Security $security, UrlGeneratorInterface $urlGenerator)
    {
        try {
            $this->session = $requestStack->getSession();
        } catch (SessionNotFoundException $e) {}
        $this->security = $security;
        $this->urlGenerator = $urlGenerator;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $user = $this->security->getUser();
        if ($user instanceof User) {
            if (!$user->getIsActive()) {
                $url = $this->urlGenerator->generate('app_logout');
                $event->setResponse(new RedirectResponse($url));
                return;
            }
        }
        $request = $event->getRequest();
        if (!$event->isMainRequest() || $request->isXmlHttpRequest()) {
            return;
        }

        if ($this->session) {
            $this->saveTargetPath($this->session, 'main', $request->getUri());
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => ['onKernelRequest']
        ];
    }
}
