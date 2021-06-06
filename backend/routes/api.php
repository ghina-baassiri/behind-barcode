<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AdminController;
use App\Models\User;


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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [LoginController::class, 'login']);
Route::post('clientRegister', [ClientController::class, 'register']);
Route::post('adminRegister', [AdminController::class, 'register']);
Route::middleware('auth.client')->get('clientDetails', [ClientController::class, 'clientDetails']);
Route::middleware('auth.admin')->get('adminDetails', [AdminController::class, 'adminDetails']);
Route::middleware('auth.user')->get('forAll', function() {
    return response()->json("THIS IS FOR ALL USERS PERMISSIONS " ,  200);
});
Route::get('permission', function() {
    echo 'permission: ' . config('permission_levels.client');
});







