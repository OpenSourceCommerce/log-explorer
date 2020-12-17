<?php

namespace App\Form;

use App\Entity\GraphLine;
use App\Services\GraphLine\GraphLineServiceInterface;
use App\Validator\GraphLineExist;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\Extension\Core\Type\ColorType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class GraphLineType extends AbstractType implements DataMapperInterface
{
    /** @var GraphLineServiceInterface */
    private $graphLineService;

    public function __construct(GraphLineServiceInterface $graphLineService)
    {
        $this->graphLineService = $graphLineService;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', TextType::class, [
                'required' => false,
                'mapped' => false,
                'constraints' => [
                    new GraphLineExist(),
                ]
            ])
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('color', ColorType::class, [
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('filter', TextType::class, [
                'required' => false
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
            'data_class' => GraphLine::class,
        ]);
    }

    /**
     * @inheritDoc
     */
    public function mapDataToForms($viewData, iterable $forms)
    {
        // TODO: Implement mapDataToForms() method.
    }

    /**
     * @inheritDoc
     */
    public function mapFormsToData(iterable $forms, &$viewData)
    {
        /** @var FormInterface[] $forms */
        $forms = iterator_to_array($forms);
        $id = $forms['id']->getData();
        if ($id) {
            $viewData = $this->graphLineService->findById($id);
        } else {
            $viewData = new GraphLine();
        }
        $viewData->setTitle($forms['title']->getData());
        $viewData->setColor($forms['color']->getData());
        $viewData->setFilter($forms['filter']->getData());
    }
}
