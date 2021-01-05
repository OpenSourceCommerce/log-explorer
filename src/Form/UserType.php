<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $isAdmin = $options['is_admin'];
        $builder
            ->add('first_name', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('last_name', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
        ;
        if ($isAdmin) {
            $builder
                ->add('email', EmailType::class, [
                    'constraints' => [
                        new NotBlank(),
                        new Email([
                            'message' => 'Email address is not valid'
                        ]),
                    ]
                ])
                ->add('is_admin', TextType::class, [
                    'required' => false
                ])
            ;
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
            'data_class' => User::class,
            'is_admin' => false,
        ]);
    }
}
