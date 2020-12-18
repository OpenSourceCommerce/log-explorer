<?php

namespace App\Entity;

use App\Repository\LogViewRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity(repositoryClass=LogViewRepository::class)
 * @ORM\Table(name="logviews")
 * @ORM\HasLifecycleCallbacks
 */
class LogView implements \JsonSerializable
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
     * @ORM\OneToOne(targetEntity=Table::class, inversedBy="logView", cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="table_id", nullable=false)
     */
    private $table;

    /**
     * @ORM\ManyToMany(targetEntity=Column::class)
     * @ORM\JoinTable(name="logview_summary")
     */
    private $summary;

    /**
     * @ORM\OneToMany(targetEntity=LogViewColumn::class, mappedBy="logView")
     */
    private $logViewColumns;

    /**
     * @ORM\OneToOne(targetEntity=Graph::class, inversedBy="logView", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $graph;

    public function __construct()
    {
        $this->summary = new ArrayCollection();
        $this->uuid = Uuid::uuid4();
        $this->logViewColumns = new ArrayCollection();
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
     * @return Collection
     */
    public function getSummary(): Collection
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

    public function removeSummary(Column $column): self
    {
        $this->summary->removeElement($column);

        return $this;
    }

    public function clearSummary(): self
    {
        $this->summary->clear();
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

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return [
            'uuid' => $this->getUuid(),
            'name' => $this->getName(),
            'table' => $this->getTable()->getName()
        ];
    }

    /**
     * @return Collection|LogViewColumn[]
     */
    public function getLogViewColumns(): Collection
    {
        return $this->logViewColumns;
    }

    public function addLogViewColumn(LogViewColumn $logViewColumn): self
    {
        if (!$this->logViewColumns->contains($logViewColumn)) {
            $this->logViewColumns[] = $logViewColumn;
            $logViewColumn->setLogView($this);
        }

        return $this;
    }

    public function removeLogViewColumn(LogViewColumn $logViewColumn): self
    {
        if ($this->logViewColumns->removeElement($logViewColumn)) {
            // set the owning side to null (unless already changed)
            if ($logViewColumn->getLogView() === $this) {
                $logViewColumn->setLogView(null);
            }
        }

        return $this;
    }
}
