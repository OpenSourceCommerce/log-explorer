<?php


namespace App\Services\Mailer;


use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Twig\Environment;

class MailerService implements MailerServiceInterface
{
    /** @var Environment */
    private $twig;
    /** @var \Swift_Mailer */
    private $mailer;
    /** @var ParameterBagInterface */
    private $parameterBag;

    /**
     * MailerService constructor.
     * @param Environment $twig
     * @param \Swift_Mailer $mailer
     * @param ParameterBagInterface $parameterBag
     */
    public function __construct(Environment $twig, \Swift_Mailer $mailer, ParameterBagInterface $parameterBag)
    {
        $this->twig = $twig;
        $this->mailer = $mailer;
        $this->parameterBag = $parameterBag;
    }

    /**
     * Get SwiftMailer Transport
     *
     * @return \Swift_Mailer|\Swift_SendmailTransport
     */
    private function getMailer()
    {
        return $this->mailer;
    }

    /**
     * @inheritDoc
     */
    public function send($template, $title, $to, $data = [])
    {
        $mailer = $this->getMailer();
        $message = (new \Swift_Message($title))
            ->setFrom($this->parameterBag->get('app.from_email'))
            ->setTo($to)
            ->setBody(
                $this->renderView($template, $data),
                'text/html'
            );

        return $mailer->send($message);
    }

    /**
     * @inheritDoc
     */
    public function sendEmailConfirmation(string $email, array $data)
    {
        return $this->send('confirmation', 'Confirm Your Account', $email, $data);
    }

    /**
     * @param $template
     * @param $data
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    private function renderView($template, $data): string
    {
        return $this->twig->render("mail/{$template}.html.twig", $data);
    }
}
