<?php


namespace App\Services\GraphLine;


use App\Entity\GraphLine;
use App\Repository\GraphLineRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;

class GraphLineService implements GraphLineServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @return GraphLineRepository|ObjectRepository
     */
    private function getRepository(): ObjectRepository
    {
        return $this->em->getRepository(GraphLine::class);
    }

    /**
     * @inheritDoc
     */
    public function findById($id): GraphLine
    {
        return $this->getRepository()->find($id);
    }
}
