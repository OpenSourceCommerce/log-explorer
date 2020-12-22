<?php


namespace App\Services\Mailer;

use Swift_Mailer;
use Swift_SendmailTransport;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

/**
 * Class MailerService
 * @package App\Services\Mail
 */
class MailerService implements MailerServiceInterface
{

    /**
     * @var Environment
     */
    private $twig;
    /**
     * @var TranslatorInterface
     */
    private $translator;
    /**
     * @var Swift_Mailer
     */
    private $mailer;
    /** @var ContainerBagInterface */
    private $containerBag;

    /**
     * MailerService constructor.
     * @param Environment $twig
     * @param TranslatorInterface $translator
     * @param Swift_Mailer $mailer
     * @param ContainerBagInterface $containerBag
     */
    public function __construct(
        Environment $twig,
        TranslatorInterface $translator,
        Swift_Mailer $mailer,
        ContainerBagInterface $containerBag
    )
    {
        $this->twig = $twig;
        $this->translator = $translator;
        $this->mailer = $mailer;
        $this->containerBag = $containerBag;
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
     * @param $template
     * @param $title
     * @param $to
     * @param array $data
     * @return mixed
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function send($template, $title, $to, $data = [])
    {
        $mailer = $this->getMailer();
        $message = (new \Swift_Message($this->translator->trans($title)))
            ->setFrom($this->containerBag->get('app.email.from'))
            ->setTo($to)
            ->setBody(
                $this->renderView($template, $data),
                'text/html'
            );

        return $mailer->send($message);
    }

    /**
     * Send confirmation mail to user
     *
     * @param $to
     * @param $data
     * @return mixed
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function sendActivationToUser($to, $data)
    {
        return $this->send('user_activation', 'Confirm Your Account', $to,
            $data);
    }

    /**
     * @param string $email
     * @param array $data
     * @return mixed
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function sendInvitationToUser(string $email, array $data)
    {
        return $this->send('user_invitation', 'Confirm Your Account', $email,
            $data);
    }

    /**
     * @param string $email
     * @param array $data
     * @return mixed
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function sendProjectInvitationEmail(string $email, array $data)
    {
        return $this->send('project_invitation', 'New project invitation', $email,
            $data);
    }

    /**
     * @param $template
     * @param $data
     * @return string
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    private function renderView($template, $data)
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
    public function sendResetPasswordEmail($to, $data) {
        return $this->send('reset_password', 'Reset your password', $to,
            $data);
    }
}