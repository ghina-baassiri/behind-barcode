<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login',[LoginController::class, 'userLogin'])->name('login');
Route::post('register',[RegisterController::class, 'userRegister'])->name('register');
Route::post('logout',[LoginController::class, 'logout'])->name('logout');

Route::middleware(['user'])->group(function () {
    // authenticated admin routes here 
    Route::get('home',[UserApiController::class, 'home']);
});
 