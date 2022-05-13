<?php

namespace App\Entity;

use App\Repository\DashboardRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

/**
 * @ORM\Entity(repositoryClass=DashboardRepository::class)
 * @ORM\Table(name="dashboards")
 * @ORM\HasLifecycleCallbacks
 */
class Dashboard implements \JsonSerializable
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
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $query;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=DashboardWidget::class, mappedBy="dashboard")
     */
    private $dashboardWidgets;

    public function __construct()
    {
        $this->uuid = Uuid::uuid4();
        $this->dashboardWidgets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUuid(): UuidInterface
    {
        return $this->uuid;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
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
     * @return Collection|DashboardWidget[]
     */
    public function getDashboardWidgets(): Collection
    {
        return $this->dashboardWidgets;
    }

    public function addDashboardWidget(DashboardWidget $dashboardWidget): self
    {
        if (!$this->dashboardWidgets->contains($dashboardWidget)) {
            $this->dashboardWidgets[] = $dashboardWidget;
            $dashboardWidget->setDashboard($this);
        }

        return $this;
    }

    public function removeDashboardWidget(DashboardWidget $dashboardWidget): self
    {
        if ($this->dashboardWidgets->removeElement($dashboardWidget)) {
            // set the owning side to null (unless already changed)
            if ($dashboardWidget->getDashboard() === $this) {
                $dashboardWidget->setDashboard(null);
            }
        }

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'uuid' => $this->getUuid()->toString(),
            'query' => $this->getQuery(),
            'last_updated' => ($this->updatedAt ?? $this->createdAt)->format('Y-m-d H:i'),
        ];
    }

    public function getQuery(): ?string
    {
        return $this->query;
    }

    public function setQuery(?string $query): self
    {
        $this->query = $query;

        return $this;
    }
}
