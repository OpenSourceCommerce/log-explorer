<?php

namespace App\Form;

use App\Validator\Log as LogConstraint;
use App\Validator\Table as TableConstraint;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class LogType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('table', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                    new TableConstraint()
                ]
            ])
            ->add('data', CollectionType::class, [
                'entry_type' => TextType::class,
                'allow_add' => true,
                'entry_options' => [
                    'constraints' => [
                        new NotBlank()
                    ]
                ],
                'constraints' => [
                    new NotBlank(),
                    new LogConstraint()
                ]
            ]);

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false
        ]);
    }
}
