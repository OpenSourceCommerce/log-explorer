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
     * @ORM\ManyToOne(targetEntity=Table::class)
     * @ORM\JoinColumn(name="table_id", nullable=false)
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

    public function __construct()
    {
        $this->lines = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
            'table_id' => $this->getTable()->getId(),
            'table_name' => $this->getTable()->getName(),
            'title' => $this->getTitle(),
            'max_point' => $this->getMaxPoint(),
            'last_updated' => ($this->getUpdatedAt() ?? $this->getCreatedAt())->format('Y-m-d H:i'),
        ];
    }
}
