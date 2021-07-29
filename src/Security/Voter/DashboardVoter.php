<?php


namespace App\Security\Voter;


use App\Constant\VoterConstant;
use App\Entity\Dashboard;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class DashboardVoter extends Voter
{

    /**
     * @inheritDoc
     */
    protected function supports(string $attribute, $subject)
    {
        return $subject instanceof Dashboard;
    }

    /**
     * @inheritDoc
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        if (!$user instanceof User) {
            return false;
        }
        if ($user->isAdmin()) {
            return true;
        }
        if ($attribute == VoterConstant::VIEW) {
            return true;
        }
        return false;
    }
}
