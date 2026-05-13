<?php

namespace App\Policies;

use App\Models\DiseaseDetection;
use App\Models\User;

class DiseaseDetectionPolicy
{
    public function view(User $user, DiseaseDetection $detection): bool { return $user->id === $detection->user_id || $user->isAdmin(); }
    public function delete(User $user, DiseaseDetection $detection): bool { return $user->id === $detection->user_id || $user->isAdmin(); }
}
