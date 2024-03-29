<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Http\Request;
use App\Models\User;

class Client extends Authenticatable
{
    use HasApiTokens , HasFactory, Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'avatar',
        'phone',
        'fcm_token',
    ];

     /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'fcm_token',
    ];


     /**
    * Get user details using user_id of Admin.
    *
    * @param  
    * @return User
    *
    */
    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
    * Create client instance.
    *
    * @param Request
    * @param int
    */
    public static function createClient(Request $request, int $user_id) {
        $client = new Client();
        $client->avatar = $request['avatar'];
        $client->phone = $request['phone'];
        $client->fcm_token = $request['fcm_token'];
        $client->user_id = $user_id;
        $client->save();
    }
}
