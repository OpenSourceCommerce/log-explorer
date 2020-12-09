<?php

namespace App\Entity;

use App\Repository\DashboardRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DashboardRepository::class)
 * @ORM\Table(name="dashboards")
 * @ORM\HasLifecycleCallbacks
 */
class Dashboard
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
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
     * @ORM\JoinTable(name="dashboard_summary")
     */
    private $summary;

    public function __construct()
    {
        $this->summary = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUuid()
    {
        return $this->uuid;
    }

    public function setUuid($uuid): self
    {
        $this->uuid = $uuid;

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
     * @return Collection|Column[]
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

    public function removeSummary(Column $summary): self
    {
        $this->summary->removeElement($summary);

        return $this;
    }
}
