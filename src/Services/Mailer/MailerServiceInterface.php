<?php


namespace App\Services\Mailer;


use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

/**
 * Interface MailerServiceInterface
 * @package App\Services\Mailer
 */
interface MailerServiceInterface
{
    /**
     * Send email
     *
     * @param $template
     * @param $title
     * @param $to
     * @param array $data
     * @return mixed
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function send($template, $title, $to, $data = []);

    /**
     * @param string $email
     * @param array $data
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function sendEmailConfirmation(string $email, array $data);

    /**
     * @param $to
     * @param array $data
     * @return mixed
     */
    public function sendResetPasswordEmail($to, array $data);

    /**
     * @param $subject
     * @param $to
     * @param array $data
     * @return mixed
     */
    public function sendAlertEmail($subject, $to, array $data);
}
