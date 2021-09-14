<?php

namespace App\Entity;

use App\Repository\ExportRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ExportRepository::class)
 * @ORM\Table (name="export")
 * @ORM\HasLifecycleCallbacks
 */
class Export implements \JsonSerializable
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
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="exports")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=500)
     */
    private $filter;

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
    private $finishedAt;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $path;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $expiredAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $format;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTable(): ?string
    {
        return $this->table;
    }

    public function setTable(string $table): self
    {
        $this->table = $table;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getFilter(): ?array
    {
        return json_decode($this->filter, true);
    }

    public function setFilter(string $filter): self
    {
        $this->filter = $filter;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @ORM\PrePersist
     * @return $this
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
     * @return $this
     */
    public function setUpdatedAt(): self
    {
        $this->updatedAt = new \DateTime();

        return $this;
    }

    public function getFinishedAt(): ?\DateTimeInterface
    {
        return $this->finishedAt;
    }

    public function setFinishedAt(?\DateTimeInterface $finishedAt): self
    {
        $this->finishedAt = $finishedAt;

        return $this;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(?string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getExpiredAt(): ?\DateTimeInterface
    {
        return $this->expiredAt;
    }

    public function setExpiredAt(?\DateTimeInterface $expiredAt): self
    {
        $this->expiredAt = $expiredAt;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(string $format): self
    {
        $this->format = $format;

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
            'isFinished' => !empty($this->getFinishedAt()),
            'createdAt' => $this->getCreatedAt()->format('Y-m-d H:i:s'),
            'expiredAt' => $this->getExpiredAt() ? $this->getExpiredAt()->format('Y-m-d H:i:s') : null,
            'filename' => !empty($this->getFinishedAt()) ? "{$this->getTable()}-{$this->getFinishedAt()->format('Ymd_His')}.{$this->getFormat()}" : '',
            'path' => $this->getPath(),
            'format' => $this->getFormat(),
        ];
    }
}
