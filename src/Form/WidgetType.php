<?php

namespace App\Form;

use App\Entity\Widget;
use App\Services\Widget\WidgetIterationInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class WidgetType extends AbstractType
{
    /** @var WidgetIterationInterface */
    private $widgetIteration;

    public function __construct(WidgetIterationInterface $widgetIteration)
    {
        $this->widgetIteration = $widgetIteration;
    }

    private function getWidgetChoices(): array
    {
        $list = [];
        foreach ($this->widgetIteration->getWidgets() as $item) {
            $list[$item->getName()] = $item->getType();
        }
        return $list;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('type', ChoiceType::class, [
                'choices' => $this->getWidgetChoices(),
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('table', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('column', TextType::class, [
            ])
            ->add('isOrderDesc', CheckboxType::class, [
            ])
            ->add('size', NumberType::class, [
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
            'data_class' => Widget::class
        ]);
    }
}
