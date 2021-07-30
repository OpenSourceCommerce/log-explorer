<?php


namespace App\Services\Mailer;

use Swift_Mailer;
use Swift_SendmailTransport;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

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
     * @return Swift_Mailer|Swift_SendmailTransport
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
            ->setFrom($this->parameterBag->get('app.email.from'))
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
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    private function renderView($template, $data): string
    {
        return $this->twig->render("mail/{$template}.html.twig", $data);
    }

    /**
     * Send confirmation mail to user
     *
     * @param $to
     * @param array $data
     * @return mixed
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function sendResetPasswordEmail($to, array $data) {
        return $this->send('reset_password', 'Reset your password', $to,
            $data);
    }

    /**
     * @inheritDoc
     */
    public function sendAlertEmail($subject, $to, array $data)
    {
        return $this->send('alert', $subject, $to,
            $data);
    }
}
