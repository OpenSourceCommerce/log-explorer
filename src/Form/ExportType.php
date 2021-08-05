<?php

namespace App\Form;

use App\Entity\Export;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class ExportType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('table', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('filter', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('format', ChoiceType::class, [
                'choices' => [
                    'CSV' => 'csv',
                    'JSON' => 'json',
                ],
                'constraints' => [
                    new NotBlank()
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Export::class,
            'csrf_protection' => false,
        ]);
    }
}
