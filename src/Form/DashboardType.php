<?php

namespace App\Form;

use App\Entity\Dashboard;
use App\Services\Widget\WidgetServiceInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class DashboardType extends AbstractType
{
    /** @var WidgetServiceInterface */
    private $widgetService;

    public function __construct(WidgetServiceInterface $widgetService)
    {
        $this->widgetService = $widgetService;
    }

    private function getWidgetIds(): array
    {
        return $this->widgetService->getWidgetIds();
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('query', TextType::class, [
            ])
            ->add('widgets', ChoiceType::class, [
                'mapped' => false,
                'choices' => $this->getWidgetIds(),
                'multiple' => false,
                'constraints' => [
                    new DashboardWidgetIds(),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
            'data_class' => Dashboard::class,
        ]);
    }
}
