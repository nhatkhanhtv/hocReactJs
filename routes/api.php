<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => ['web'],
    'namespace'  => 'Api',
], function () { // custom admin routes
    // CRUD resources and other admin routes
    
   CRUD::resource('/post', 'PostController');
//    CRUD::resource('/groups', 'GroupController');
//    Route::post('/dynamic-form', 'ContactController@dynamicForm');

});