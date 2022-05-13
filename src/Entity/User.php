<?php

namespace App\Entity;

use App\Constant\RoleConstant;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JsonSerializable;
use Symfony\Component\Security\Core\User\EquatableInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @UniqueEntity(fields={"email"}, message="Email is already taken")
 * @ORM\Table(name="users")
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface, JsonSerializable, EquatableInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", name="first_name", length=255)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", name="last_name", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $password;

    /**
     * @ORM\Column(type="boolean", name="is_active")
     */
    private $isActive;

    /**
     * @ORM\Column(type="boolean", name="is_confirmed")
     */
    private $isConfirmed;

    /**
     * @ORM\Column(type="datetime", name="created_at", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserToken", mappedBy="user")
     */
    private $userTokens;

    /**
     * @ORM\OneToMany(targetEntity=LogViewQuery::class, mappedBy="user", orphanRemoval=true)
     */
    private $logViewQueries;

    /**
     * @ORM\OneToMany(targetEntity=Export::class, mappedBy="user", orphanRemoval=true)
     */
    private $exports;

    /**
     * @ORM\OneToMany(targetEntity=WidgetQuery::class, mappedBy="user")
     */
    private $widgetQueries;

    public function __construct()
    {
        $this->userTokens = new ArrayCollection();
        $this->logViewQueries = new ArrayCollection();
        $this->exports = new ArrayCollection();
        $this->widgetQueries = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = RoleConstant::USER;

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getIsConfirmed(): ?bool
    {
        return $this->isConfirmed;
    }

    public function setIsConfirmed(bool $isConfirmed): self
    {
        $this->isConfirmed = $isConfirmed;

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
        if (empty($this->createdAt)) {
            $this->createdAt = new \DateTime();
        }

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
     * @return bool
     */
    public function isAdmin(): bool
    {
        return in_array(RoleConstant::USER_ADMIN, $this->getRoles());
    }

    /**
     * @param bool $isAdmin
     * @return self
     */
    public function setIsAdmin($isAdmin): self
    {
        $roles = [];
        if (!empty($isAdmin)) {
            $roles[] = RoleConstant::USER_ADMIN;
        }
        return $this->setRoles($roles);
    }

    /**
     * @return Collection|UserToken[]
     */
    public function getUserTokens(): Collection
    {
        return $this->userTokens;
    }

    public function addUserToken(UserToken $userToken): self
    {
        if (!$this->userTokens->contains($userToken)) {
            $this->userTokens[] = $userToken;
            $userToken->setUser($this);
        }

        return $this;
    }

    public function removeUserToken(UserToken $userToken): self
    {
        if ($this->userTokens->contains($userToken)) {
            $this->userTokens->removeElement($userToken);
            // set the owning side to null (unless already changed)
            if ($userToken->getUser() === $this) {
                $userToken->setUser(null);
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
            'first_name' => $this->getFirstName(),
            'last_name' => $this->getLastName(),
            'email' => $this->getEmail(),
            'is_active' => $this->getIsActive(),
            'is_confirmed' => $this->getIsConfirmed(),
            'roles' => $this->getRoles(),
            'is_admin' => $this->isAdmin() ? 1 : 0,
            'status' => ($this->getIsConfirmed() && $this->getIsActive()) ? 'Active' : ($this->getIsConfirmed() ? 'Inactive' : 'Pending'),
            'last_updated' => ($this->getUpdatedAt() ?? $this->getCreatedAt())->format('Y-m-d H:i'),
        ];
    }

    /**
     * @inheritDoc
     */
    public function getSalt()
    {

    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->getEmail();
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername()
    {
        return $this->getEmail();
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials()
    {

    }

    /**
     * @inheritDoc
     */
    public function isEqualTo(UserInterface $user): bool
    {
        if (!$user instanceof User) {
            return false;
        }
        if ($this->getIsActive() != $user->getIsActive()) {
            return false;
        }
        return true;
    }

    /**
     * @return Collection|LogViewQuery[]
     */
    public function getLogViewQueries(): Collection
    {
        return $this->logViewQueries;
    }

    public function addLogViewQuery(LogViewQuery $logViewQuery): self
    {
        if (!$this->logViewQueries->contains($logViewQuery)) {
            $this->logViewQueries[] = $logViewQuery;
            $logViewQuery->setUser($this);
        }

        return $this;
    }

    public function removeLogViewQuery(LogViewQuery $logViewQuery): self
    {
        if ($this->logViewQueries->removeElement($logViewQuery)) {
            // set the owning side to null (unless already changed)
            if ($logViewQuery->getUser() === $this) {
                $logViewQuery->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Export[]
     */
    public function getExports(): Collection
    {
        return $this->exports;
    }

    public function addExport(Export $export): self
    {
        if (!$this->exports->contains($export)) {
            $this->exports[] = $export;
            $export->setUser($this);
        }

        return $this;
    }

    public function removeExport(Export $export): self
    {
        if ($this->exports->removeElement($export)) {
            // set the owning side to null (unless already changed)
            if ($export->getUser() === $this) {
                $export->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|WidgetQuery[]
     */
    public function getWidgetQueries(): Collection
    {
        return $this->widgetQueries;
    }

    public function addWidgetQuery(WidgetQuery $widgetQuery): self
    {
        if (!$this->widgetQueries->contains($widgetQuery)) {
            $this->widgetQueries[] = $widgetQuery;
            $widgetQuery->setUser($this);
        }

        return $this;
    }

    public function removeWidgetQuery(WidgetQuery $widgetQuery): self
    {
        if ($this->widgetQueries->removeElement($widgetQuery)) {
            // set the owning side to null (unless already changed)
            if ($widgetQuery->getUser() === $this) {
                $widgetQuery->setUser(null);
            }
        }

        return $this;
    }
}
