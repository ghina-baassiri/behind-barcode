<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\Address;

class User extends Authenticatable
{
    use HasApiTokens , HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'address_id',
        'permission_level'      
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function address() {
        return $this->hasOne(Address::class, 'id', 'address_id');
    }

    public static function createUser(array $userData, int $permission_level) {
        $address = Address::create([
            'address' => $userData['address'],
            'longitude' => $userData['longitude'],
            'latitude' => $userData['latitude'],
        ]);
        return User::create([
            'first_name' => $userData['first_name'],
            'last_name' => $userData['last_name'],
            'permission_level' => $permission_level,
            'email' => $userData['email'],
            'password' => $userData['password'],
            'address_id' => $address->id,
        ]);
    }
}
