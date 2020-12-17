<?php

namespace App\Form;

use App\Transformers\IdToColumnTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class LogViewColumnType extends AbstractType
{
    /**
     * @var IdToColumnTransformer
     */
    private $idToColumnTransformer;

    /**
     * LogViewColumnType constructor.
     * @param IdToColumnTransformer $idToColumnTransformer
     */
    public function __construct(
        IdToColumnTransformer $idToColumnTransformer
    ) {

        $this->idToColumnTransformer = $idToColumnTransformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('visible', ChoiceType::class, [
                'choices' => [
                    'Visible' => 1,
                    'Invisible' => 0
                ],
                'constraints' => [
                    new NotBlank()
                ],
                'choice_translation_domain' => 'boolean'
            ])
            ->add('column', TextType::class, [
                'constraints' => [
                    new NotBlank()
                ]
            ]);

        $builder->get('column')->addModelTransformer($this->idToColumnTransformer);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'allow_extra_fields' => true,
        ]);
    }
}
