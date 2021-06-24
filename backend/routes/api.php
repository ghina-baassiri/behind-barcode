<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CommonAPIsController;
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


Route::group(['middleware' => 'auth.client'], function () {
    Route::get('clientDetails', [ClientController::class, 'clientDetails']);  
    Route::post('addRating', [ClientController::class, 'addRating']);
    Route::get('marketRating', [ClientController::class, 'marketRating']);
    Route::get('rated/{marketId}/user/{userId}', [ClientController::class, 'rated']);
});

Route::group(['middleware' => 'auth.admin'], function () {
    Route::get('adminDetails', [AdminController::class, 'adminDetails']);  
});

Route::group(['middleware' => 'auth.user'], function () {
    Route::post('logout', [LoginController::class, 'logout']);
    Route::get('allMarkets', [CommonAPIsController::class, 'allMarkets']);
    Route::get('allProducts', [CommonAPIsController::class, 'allProducts']);
    Route::get('marketProducts/{id}', [CommonAPIsController::class, 'marketProducts']); 
    Route::get('productMarkets/{barcode}', [CommonAPIsController::class, 'productMarkets']);   
    Route::get('product/{barcode}', [CommonAPIsController::class, 'product']);   

});




