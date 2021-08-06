<?php

namespace App\Form;

use App\Entity\Alert;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\NotBlank;

class AlertType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('from_table', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('query', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('threshold', NumberType::class, [
                'constraints' => [
                    new NotBlank(),
                    new GreaterThan(0)
                ]
            ])
            ->add('time_range', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('interval_time', NumberType::class, [
                'constraints' => [
                    new NotBlank(),
                    new GreaterThan(0)
                ]
            ])
            ->add('email', EmailType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('subject', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('isActive', ChoiceType::class, [
                'choices' => [
                    'Inactive' => '0',
                    'Active' => '1',
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Alert::class,
            'allow_extra_fields' => true,
            'csrf_protection' => false,
        ]);
    }
}
