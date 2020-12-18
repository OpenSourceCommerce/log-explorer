<?php

namespace App\Entity;

use App\Repository\LogViewColumnRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LogViewColumnRepository::class)
 * @ORM\Table(name="logview_columns")
 * @ORM\HasLifecycleCallbacks
 */
class LogViewColumn implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=LogView::class, inversedBy="logViewColumns")
     * @ORM\JoinColumn(nullable=false, name="logview_id")
     */
    private $logView;

    /**
     * @ORM\ManyToOne(targetEntity=Column::class, inversedBy="logViewColumns")
     * @ORM\JoinColumn(nullable=false, name="column_id")
     */
    private $column;

    /**
     * @ORM\Column(type="boolean")
     */
    private $visible;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $label;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLogView(): ?LogView
    {
        return $this->logView;
    }

    public function setLogView(?LogView $logView): self
    {
        $this->logView = $logView;

        return $this;
    }

    public function getColumn(): ?Column
    {
        return $this->column;
    }

    public function setColumn(?Column $column): self
    {
        $this->column = $column;

        return $this;
    }

    public function getVisible(): ?bool
    {
        return $this->visible;
    }

    public function setVisible(bool $visible): self
    {
        $this->visible = $visible;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'logview' => $this->getLogView(),
            'column' => $this->getColumn(),
            'label' => $this->getLabel(),
            'visible' => $this->getVisible(),
        ];
    }
}
