<?php

namespace App\Entity;

use App\Repository\AlertRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AlertRepository::class)
 * @ORM\Table (name="alerts")
 * @ORM\HasLifecycleCallbacks
 */
class Alert implements \JsonSerializable
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
     * @ORM\Column(type="string", length=255)
     */
    private $from_table;

    /**
     * @ORM\Column(type="string", length=500)
     */
    private $query;

    /**
     * @ORM\Column(type="integer")
     */
    private $threshold;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $time_range;

    /**
     * @ORM\Column(type="integer")
     */
    private $interval_time;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $subject;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $nextRunAt;

    public function __construct()
    {
        $this->alertLogs = new ArrayCollection();
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

    public function getFromTable(): ?string
    {
        return $this->from_table;
    }

    public function setFromTable(string $from_table): self
    {
        $this->from_table = $from_table;

        return $this;
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

    public function getThreshold(): ?int
    {
        return $this->threshold;
    }

    public function setThreshold(?int $threshold): self
    {
        $this->threshold = $threshold;

        return $this;
    }

    public function getTimeRange(): ?string
    {
        return $this->time_range;
    }

    public function setTimeRange(?string $time_range): self
    {
        $this->time_range = $time_range;

        return $this;
    }

    public function getIntervalTime(): ?int
    {
        return $this->interval_time;
    }

    public function setIntervalTime(?int $interval_time): self
    {
        $this->interval_time = $interval_time;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(?bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
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

    public function getUpdatedAt(): ?\DateTime
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
    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'from_table' => $this->getFromTable(),
            'query' => $this->getQuery(),
            'threshold' => (string)$this->getThreshold(),
            'time_range' => $this->parseTimeRange($this->getTimeRange()),
            'interval_time' => (string)$this->getIntervalTime(),
            'email' => $this->getEmail(),
            'subject' => $this->getSubject(),
            'isActive' => $this->getIsActive() ? '1' : '0',
        ];
    }

    private function parseTimeRange($timeRange): array
    {
        list($label, $from, $to) = explode('|', $timeRange);

        return [
            'from' => $from,
            'to' => $to,
            'label' => $label,
        ];
    }

    public function getNextRunAt(): ?\DateTimeInterface
    {
        return $this->nextRunAt;
    }

    public function setNextRunAt(?\DateTimeInterface $nextRunAt): self
    {
        $this->nextRunAt = $nextRunAt;

        return $this;
    }
}
