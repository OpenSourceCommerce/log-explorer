<?php


namespace App\Services\Graph;


use App\Entity\Graph;
use App\Entity\GraphLine;
use App\Exceptions\ActionDeniedException;
use App\Exceptions\BadSqlException;
use App\Repository\GraphRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;

class GraphService implements GraphServiceInterface
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @return GraphRepository
     */
    private function getRepository(): ObjectRepository
    {
        return $this->em->getRepository(Graph::class);
    }

    private function checkIfFilterInvalid(string $table, ?string $sql = null): bool
    {
        if (empty($sql)) {
            return false;
        }
        // TODO: check sql is valid or not?
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
            if ($this->checkIfFilterInvalid($graph->getTable(), $line->getFilter())) {
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
            if ($this->checkIfFilterInvalid($graph->getTable(), $line->getFilter())) {
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

    /**
     * @inheritDoc
     */
    public function getAllGraph(): array
    {
        return $this->getRepository()->findAllNotLogView();
    }

    /**
     * @inheritDoc
     */
    public function delete(Graph $graph)
    {
        $this->em->remove($graph);
        $this->em->flush();
    }

    /**
     * @inheritDoc
     */
    public function createLogViewGraph(string $table, int $maxPoint = 12, bool $flush = true): Graph
    {
        $graph = new Graph();
        $graph->setTitle('Log view');
        $graph->setTable($table);
        $graph->setMaxPoint($maxPoint);
        $this->em->persist($graph);
        if ($flush) {
            $this->em->flush();
        }
        return $graph;
    }
}
