<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

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
                ->add('is_admin', NumberType::class, [
                    'constraints' => [
                        new Range(['min' => 0, 'max' => 1]),
                    ]
                ])
            ;
        } else {
            $builder
                ->add('password', TextType::class, [
                    'mapped' => false,
                    'constraints' => [
                        new Length(['min' => 6]),
                    ]
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
