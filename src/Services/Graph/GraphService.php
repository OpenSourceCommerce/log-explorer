<?php


namespace App\Services\Graph;


use App\Entity\Graph;
use App\Entity\GraphLine;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use Doctrine\ORM\EntityManagerInterface;

class GraphService implements GraphServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    private function checkIfFilterInvalid(?string $sql): bool
    {
        return false;
    }

    /**
     * @inheritDoc
     */
    public function createGraph(Graph $graph, array $lines): Graph
    {
        /** @var GraphLine $line */
        foreach ($lines as $line) {
            if ($line->getId()) {
                throw new ActionDeniedException();
            }
            if ($this->checkIfFilterInvalid($line->getFilter())) {
                throw new BadSqlException('Bad sql: "'.$line->getFilter().'"');
            }
            $graph->addLine($line);
        }
        $this->em->persist($graph);
        $this->em->flush();
        return $graph;
    }

    /**
     * @inheritDoc
     */
    public function updateGraph(Graph $graph, array $lines): Graph
    {
        $graphLines = [];
        /** @var GraphLine $line */
        foreach ($graph->getLines()->toArray() as $line) {
            $graphLines[$line->getId()] = $line;
        }

        /** @var GraphLine $line */
        foreach ($lines as $line) {
            if ($line->getId()) {
                unset($graphLines[$line->getId()]);
                if ($line->getGraph()->getId() !== $graph->getId()) {
                    throw new ActionDeniedException();
                }
            }
            if ($this->checkIfFilterInvalid($line->getFilter())) {
                throw new BadSqlException('Bad sql: "'.$line->getFilter().'"');
            }
            $graph->addLine($line);
        }
        foreach ($graphLines as $line) {
            $graph->removeLine($line);
            $this->em->remove($line);
        }
        $this->em->persist($graph);
        $this->em->flush();
        return $graph;
    }
}
