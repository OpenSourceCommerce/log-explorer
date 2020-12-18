<?php

namespace App\Form;

use App\Entity\Table;
use App\Validator\DbName;
use App\Validator\TableTTL;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class TableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', TextType::class, [
                'required' => false
            ])
            ->add('name', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                    new DbName(),
                ]
            ])
            ->add('columns', CollectionType::class, [
                'entry_type' => ColumnType::class,
                'allow_add' => true,
                'constraints' => [
                    new NotBlank()
                ]
            ])
            ->add('ttl', TextType::class, [
                'required' => false,
                'mapped' => false,
            ])
        ;

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
//            'data_class' => Table::class,
        ]);
    }
}
