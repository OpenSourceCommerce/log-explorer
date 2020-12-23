<?php

namespace App\Entity;

use App\Constant\RoleConstant;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JsonSerializable;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @UniqueEntity(fields={"email"}, message="Email is already taken")
 * @ORM\Table(name="users")
 */
class User implements UserInterface, JsonSerializable
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

    public function __construct()
    {
        $this->userTokens = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRoles(): ?array
    {
        $roles = $this->roles;
        $roles[] = RoleConstant::USER;
        return $roles;
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
    public function jsonSerialize()
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
     * @inheritDoc
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
}
