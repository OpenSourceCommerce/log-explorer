<?php

namespace App\Entity;

use App\Repository\WidgetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Exception;

/**
 * @ORM\Entity(repositoryClass=WidgetRepository::class)
 * @ORM\Table(name="widgets")
 * @ORM\HasLifecycleCallbacks
 */
class Widget implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="smallint")
     */
    private $type;

    /**
     * @ORM\Column(type="text")
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
     * @ORM\OneToMany(targetEntity=DashboardWidget::class, mappedBy="widget")
     */
    private $dashboardWidgets;

    public function __construct()
    {
        $this->dashboardWidgets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(int $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getQuery(): ?string
    {
        return $this->query;
    }

    public function setQuery(string $query): self
    {
        $this->query = $query;

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
            $dashboardWidget->setWidget($this);
        }

        return $this;
    }

    public function removeDashboardWidget(DashboardWidget $dashboardWidget): self
    {
        if ($this->dashboardWidgets->removeElement($dashboardWidget)) {
            // set the owning side to null (unless already changed)
            if ($dashboardWidget->getWidget() === $this) {
                $dashboardWidget->setWidget(null);
            }
        }

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'type' => $this->getType(),
            'query' => $this->getQuery(),
            'last_updated' => ($this->updatedAt ?? $this->createdAt)->format('Y-m-d H:i'),
        ];
    }
}
