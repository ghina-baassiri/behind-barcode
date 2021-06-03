<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    
    protected $fillable = [        
        'display_name',
        'profile_image',
        'phone',          
        'address_id',
        'fcm_token',
        // common fields with admin
        'first_name',
        'last_name',
        'email', 
        'password',         
    ];
 
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function address() {
        return this->belongsTo(Address::class);
    }

    public function rating() {
        return this->belongsToMany(Rating::class);
    }

}
