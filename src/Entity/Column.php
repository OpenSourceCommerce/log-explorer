<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JsonSerializable;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ColumnRepository")
 * @ORM\Table(name="columns")
 * @ORM\HasLifecycleCallbacks
 * @UniqueEntity(fields={"table", "name"}, message="Column name is already exist")
 */
class Column implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Table", inversedBy="columns", cascade={"persist"})
     * @ORM\JoinColumn(name="table_id", nullable=false)
     */
    private $table;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=LogViewColumn::class, mappedBy="columns")
     */
    private $logViewColumns;

    public function __construct()
    {
        $this->logViewColumns = new ArrayCollection();
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

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
            'name' => $this->getName(),
            'type' => $this->getType(),
            'title' => $this->getTitle(),
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
            $logViewColumn->setColumn($this);
        }

        return $this;
    }

    public function removeLogViewColumn(LogViewColumn $logViewColumn): self
    {
        if ($this->logViewColumns->removeElement($logViewColumn)) {
            // set the owning side to null (unless already changed)
            if ($logViewColumn->getColumn() === $this) {
                $logViewColumn->setColumn(null);
            }
        }

        return $this;
    }
}
