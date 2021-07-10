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

    /**
    * Get user details using user_id of Admin.
    *
    * @return User
    *
    */
    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
    * Create admin instance.
    *
    * @param Request
    * @param int
    */
    public static function createAdmin(Request $request, int $user_id) {
        $admin = new Admin();
        $admin->user_id = $user_id;
        $admin->save();
    }
}
