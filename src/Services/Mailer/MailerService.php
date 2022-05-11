<?php


namespace App\Services\Mailer;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class MailerService implements MailerServiceInterface
{
    /** @var MailerInterface */
    private $mailer;
    /** @var ParameterBagInterface */
    private $parameterBag;

    /**
     * MailerService constructor.
     * @param MailerInterface $mailer
     * @param ParameterBagInterface $parameterBag
     */
    public function __construct(MailerInterface $mailer, ParameterBagInterface $parameterBag)
    {
        $this->mailer = $mailer;
        $this->parameterBag = $parameterBag;
    }

    /**
     * Get MailerInterface
     *
     * @return MailerInterface
     */
    private function getMailer(): MailerInterface
    {
        return $this->mailer;
    }

    /**
     * @inheritDoc
     */
    public function send($template, $title, $to, array $data = [])
    {
        $mailer = $this->getMailer();
        $message = (new TemplatedEmail())
            ->sender(new Address($this->parameterBag->get('app.email.from')))
            ->to(new Address($to))
            ->htmlTemplate("mail/{$template}.html.twig")
            ->context($data);

        try {
            $mailer->send($message);
        } catch (TransportExceptionInterface $e) {
            return false;
        }

        return true;
    }

    /**
     * @inheritDoc
     */
    public function sendEmailConfirmation(string $email, array $data)
    {
        return $this->send('confirmation', 'Confirm Your Account', $email, $data);
    }

    /**
     * Send confirmation mail to user
     *
     * @param $to
     * @param array $data
     * @return mixed
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
