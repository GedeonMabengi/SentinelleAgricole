<?php

namespace App\Policies;

use App\Models\Plot;
use App\Models\User;

class PlotPolicy
{
    public function view(User $user, Plot $plot): bool { return $user->id === $plot->user_id || $user->isAdmin(); }
    public function update(User $user, Plot $plot): bool { return $user->id === $plot->user_id || $user->isAdmin(); }
    public function delete(User $user, Plot $plot): bool { return $user->id === $plot->user_id || $user->isAdmin(); }
}
