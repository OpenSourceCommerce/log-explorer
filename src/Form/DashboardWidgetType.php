<?php

namespace App\Form;

use App\Entity\DashboardWidget;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DashboardWidgetType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('x', IntegerType::class, [
                'required' => true,
            ])
            ->add('y', IntegerType::class, [
                'required' => true,
            ])
            ->add('width', IntegerType::class, [
                'required' => true,
            ])
            ->add('height', IntegerType::class, [
                'required' => true,
            ])
            ->add('minWidth', IntegerType::class, [
                'required' => true,
            ])
            ->add('minHeight', IntegerType::class, [
                'required' => true,
            ])
            ->add('fixed', IntegerType::class, [
                'required' => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
            'data_class' => DashboardWidget::class,
        ]);
    }
}
