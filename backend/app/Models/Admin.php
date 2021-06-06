<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Http\Request;
use App\Models\User;

class Admin extends Authenticatable
{
    use HasApiTokens , HasFactory, Notifiable;


 /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public static function createAdmin(Request $request, int $user_id) {
        $admin = new Admin();
        $admin->user_id = $user_id;
        $admin->save();
    }
}
