<?php

namespace App\Entity;

use App\Repository\GraphRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GraphRepository::class)
 * @ORM\Table(name="graphs")
 * @ORM\HasLifecycleCallbacks
 */
class Graph implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="table_name", type="string", length=255)
     */
    private $table;

    /**
     * @ORM\OneToMany(targetEntity=GraphLine::class, mappedBy="graph", orphanRemoval=true, cascade={"persist"})
     */
    private $lines;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(name="max_point", type="smallint", nullable=true)
     */
    private $maxPoint;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToOne(targetEntity=LogView::class, mappedBy="graph", cascade={"persist", "remove"})
     */
    private $logView;

    public function __construct()
    {
        $this->lines = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTable(): ?string
    {
        return $this->table;
    }

    public function setTable(?string $table): self
    {
        $this->table = $table;

        return $this;
    }

    /**
     * @return Collection|GraphLine[]
     */
    public function getLines(): Collection
    {
        return $this->lines;
    }

    public function addLine(GraphLine $line): self
    {
        if (!$this->lines->contains($line)) {
            $this->lines[] = $line;
            $line->setGraph($this);
        }

        return $this;
    }

    public function removeLine(GraphLine $line): self
    {
        if ($this->lines->removeElement($line)) {
            // set the owning side to null (unless already changed)
            if ($line->getGraph() === $this) {
                $line->setGraph(null);
            }
        }

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getMaxPoint(): ?int
    {
        return $this->maxPoint;
    }

    public function setMaxPoint(int $maxPoint): self
    {
        $this->maxPoint = $maxPoint;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAt(): self
    {
        $this->createdAt = new \DateTime();

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    /**
     * @ORM\PreUpdate
     */
    public function setUpdatedAt(): self
    {
        $this->updatedAt = new \DateTime();

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'table' => $this->getTable(),
            'title' => $this->getTitle(),
            'max_point' => $this->getMaxPoint(),
            'last_updated' => ($this->getUpdatedAt() ?? $this->getCreatedAt())->format('Y-m-d H:i'),
        ];
    }

    public function getLogView(): ?LogView
    {
        return $this->logView;
    }

    public function setLogView(LogView $logView): self
    {
        // set the owning side of the relation if necessary
        if ($logView->getGraph() !== $this) {
            $logView->setGraph($this);
        }

        $this->logView = $logView;

        return $this;
    }
}
