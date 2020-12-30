<?php

namespace App\Form;

use App\Entity\Graph;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

class GraphType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('table', TextType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('maxPoint', NumberType::class, [
                'constraints' => [
                    new NotBlank(),
                    new Range(['min' => 2, 'max' => 64]),
                ]
            ])
            ->add('lines', CollectionType::class, [
                'entry_type' => GraphLineType::class,
                'allow_add' => true,
                'mapped' => false,
                'constraints' => [
                    new NotBlank()
                ]
            ]);

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
            'data_class' => Graph::class,
        ]);
    }
}
