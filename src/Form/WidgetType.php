<?php

namespace App\Form;

use App\Services\Widget\WidgetIterationInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class WidgetType extends AbstractType implements DataMapperInterface
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
            ->add('query', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->setDataMapper($this)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'allow_extra_fields' => true,
            'csrf_protection' => false,
        ]);
    }

    /**
     * @inheritDoc
     */
    public function mapDataToForms($viewData, iterable $forms)
    {
        // ignore
    }

    /**
     * @inheritDoc
     */
    public function mapFormsToData(iterable $forms, &$viewData)
    {
        /** @var FormInterface[] $forms */
        $forms = iterator_to_array($forms);
        $type = $forms['type']->getData();
        $title = $forms['title']->getData();
        $query = $forms['query']->getData();
        foreach ($this->widgetIteration->getWidgets() as $item) {
            if ($item->getType() === $type) {
                $viewData = $item;
                break;
            }
        }
        $viewData->setTitle($title);
        $viewData->setQuery($query);
    }
}
