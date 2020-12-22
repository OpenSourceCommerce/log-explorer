<?php


namespace App\Services\Mailer;


interface MailerServiceInterface
{
    /**
     * @param $template
     * @param $title
     * @param $to
     * @param array $data
     * @return mixed
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function send($template, $title, $to, $data = []);

    /**
     * @param string $email
     * @param array $data
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function sendEmailConfirmation(string $email, array $data);
}
