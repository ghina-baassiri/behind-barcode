<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\AdminApiController;

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

Route::post('login',[LoginController::class, 'adminLogin'])->name('login');
Route::post('register',[RegisterController::class, 'adminRegister'])->name('register');
Route::post('logout',[LoginController::class, 'logout'])->name('logout');

Route::middleware(['admin'])->group(function () {
    // authenticated admin routes here
   Route::get('markets',[AdminApiController::class, 'getAllMarkets']);
   Route::get('dashboard',[AdminApiController::class, 'dashboard']);
});

// Route::get('dashboard',[AdminApiController::class, 'dashboard']);

Route::get('test', function () {
    echo 'test';
});
