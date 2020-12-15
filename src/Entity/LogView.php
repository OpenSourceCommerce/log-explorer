<?php

namespace App\Entity;

use App\Repository\LogViewRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity(repositoryClass=LogViewRepository::class)
 * @ORM\Table(name="logviews")
 * @ORM\HasLifecycleCallbacks
 */
class LogView
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var UuidInterface
     *
     * @ORM\Column(type="uuid", unique=true)
     */
    private $uuid;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Table::class)
     * @ORM\JoinColumn(name="table_id", nullable=false)
     */
    private $table;

    /**
     * @ORM\ManyToMany(targetEntity=Column::class)
     * @ORM\JoinTable(name="logview_summary")
     */
    private $summary;

    /**
     * @ORM\OneToOne(targetEntity=Graph::class, inversedBy="logView", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $graph;

    public function __construct()
    {
        $this->summary = new ArrayCollection();
        $this->uuid = Uuid::uuid4();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUuid(): UuidInterface
    {
        return $this->uuid;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getTable(): ?Table
    {
        return $this->table;
    }

    public function setTable(?Table $table): self
    {
        $this->table = $table;

        return $this;
    }

    /**
     * @return ArrayCollection
     */
    public function getSummary(): ArrayCollection
    {
        return $this->summary;
    }

    public function addSummary(Column $column): self
    {
        if ($column->getTable()->getId() !== $this->getTable()->getId()) {
            // column must same table
            throw new \LogicException();
        }
        if (!$this->summary->contains($column)) {
            $this->summary[] = $column;
        }

        return $this;
    }

    public function removeSummary(Column $summary): self
    {
        $this->summary->removeElement($summary);

        return $this;
    }

    public function getGraph(): ?Graph
    {
        return $this->graph;
    }

    public function setGraph(?Graph $graph): self
    {
        $this->graph = $graph;

        return $this;
    }

    public function getGraph2(): ?Graph
    {
        return $this->graph2;
    }

    public function setGraph2(?Graph $graph2): self
    {
        $this->graph2 = $graph2;

        return $this;
    }

    public function getGraph3(): ?Graph
    {
        return $this->graph3;
    }

    public function setGraph3(Graph $graph3): self
    {
        $this->graph3 = $graph3;

        return $this;
    }
}
