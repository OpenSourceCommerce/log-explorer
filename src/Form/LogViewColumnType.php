<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class LogViewColumnType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('visible', ChoiceType::class, [
                'choices' => [
                    'Visible' => 1,
                    'Invisible' => 0
                ],
                'constraints' => [
                    new NotBlank()
                ],
                'choice_translation_domain' => 'boolean'
            ])
            ->add('column', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('index', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ]);
    }
}
