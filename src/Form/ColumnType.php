<?php

namespace App\Form;

use App\Entity\Column;
use App\Services\Clickhouse\ClickhouseServiceInterface;
use App\Validator\DbName;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class ColumnType extends AbstractType
{
    private $types;

    public function __construct(ClickhouseServiceInterface $clickhouseService)
    {
        $this->types = $clickhouseService->getTypes();
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', TextType::class, [
                'required' => false
            ])
            ->add('name', TextType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new DbName(),
                ]
            ])
            ->add('title', TextType::class, [
                'required' => false
            ])
            ->add('type', ChoiceType::class, [
                'choices' => $this->types,
                'constraints' => [
                    new NotBlank()
                ]
            ])
        ;

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
//            'data_class' => Column::class,
        ]);
    }
}
