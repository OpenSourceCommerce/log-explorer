<?php

namespace App\Entity;

use App\Repository\LogViewRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
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

    /**
     * @ORM\OneToMany(targetEntity=LogViewQuery::class, mappedBy="logView", orphanRemoval=true)
     */
    private $queries;

    public function __construct()
    {
        $this->uuid = Uuid::uuid4();
        $this->summary = [];
        $this->logViewColumns = [];
        $this->queries = new ArrayCollection();
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
    public function jsonSerialize(): mixed
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

    /**
     * @return Collection|LogViewQuery[]
     */
    public function getQueries(?User $user = null): Collection
    {
        if ($user) {
            $criteria = Criteria::create();
            $criteria->where(Criteria::expr()->eq('user', $user));
            return $this->queries->matching($criteria);
        }
        return $this->queries;
    }

    public function addQuery(LogViewQuery $query): self
    {
        if (!$this->queries->contains($query)) {
            $this->queries[] = $query;
            $query->setLogView($this);
        }

        return $this;
    }

    public function removeQuery(LogViewQuery $query): self
    {
        if ($this->queries->removeElement($query)) {
            // set the owning side to null (unless already changed)
            if ($query->getLogView() === $this) {
                $query->setLogView(null);
            }
        }

        return $this;
    }
}
