<?php


namespace App\Services\Mailer;


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
     */
    public function send($template, $title, $to, $data = []);

    /**
     * Send confirmation mail to user
     *
     * @param $to
     * @param $data
     * @return mixed
     */
    public function sendActivationToUser($to, $data);

    /**
     * @param $to
     * @param array $data
     * @return mixed
     */
    public function sendResetPasswordEmail($to, $data);

    /**
     * @param string $email
     * @param array $data
     */
    public function sendInvitationToUser(string $email, array $data);

    /**
     * @param string $email
     * @param array $data
     */
    public function sendProjectInvitationEmail(string $email, array $data);
}