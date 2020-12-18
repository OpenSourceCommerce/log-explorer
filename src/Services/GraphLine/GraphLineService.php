<?php


namespace App\Services\GraphLine;


use App\Entity\Graph;
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

    /**
     * @inheritDoc
     */
    public function createDefaultGraphLine(Graph $graph, bool $flush = true): GraphLine
    {
        $line = new GraphLine();
        $line->setTitle('Total');
        $line->setColor('#080');
        $line->setGraph($graph);
        $this->em->persist($line);
        if ($flush) {
            $this->em->flush();
        }
        return $line;
    }
}
