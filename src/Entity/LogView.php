<?php

namespace App\Entity;

use App\Repository\LogViewRepository;
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
     * @ORM\Column(name="table_name", type="string", length=255)
     */
    private $table;

    /**
     * @ORM\Column(type="json")
     */
    private $summary;

    /**
     * @ORM\Column(type="json")
     */
    private $logViewColumns;

    /**
     * @ORM\OneToOne(targetEntity=Graph::class, inversedBy="logView", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $graph;

    public function __construct()
    {
        $this->uuid = Uuid::uuid4();
        $this->summary = [];
        $this->logViewColumns = [];
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
     * @return array
     */
    public function getSummary(): array
    {
        return $this->summary;
    }

    public function setSummary(array $summary): self
    {
        $this->summary = $summary;

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
            'table' => $this->getTable(),
            'summary' => $this->getSummary(),
            'logViewColumn' => $this->getLogViewColumns(),
        ];
    }

    /**
     * @return array|null
     */
    public function getLogViewColumns(): ?array
    {
        return $this->logViewColumns;
    }

    public function setLogViewColumn(?array $logViewColumn): self
    {
        $this->logViewColumns = $logViewColumn;

        return $this;
    }
}
