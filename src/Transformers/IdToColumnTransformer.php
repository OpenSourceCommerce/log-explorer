<?php


namespace App\Transformers;


use App\Services\Column\ColumnServiceInterface;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

/**
 * Class UuidStringToLogViewTransformer
 * @package App\Transformers
 */
class IdToColumnTransformer implements DataTransformerInterface
{

    /**
     * @var ColumnServiceInterface
     */
    private $columnService;

    /**
     * UuidStringToLogViewTransformer constructor.
     * @param ColumnServiceInterface $columnService
     */
    public function __construct(ColumnServiceInterface $columnService)
    {

        $this->columnService = $columnService;
    }

    /**
     * @inheritDoc
     */
    public function transform($value)
    {
        return $value;
    }

    /**
     * @inheritDoc
     */
    public function reverseTransform($value)
    {
        if (empty($value)) {
            return null;
        }

        return $this->columnService->findById($value);
    }
}
