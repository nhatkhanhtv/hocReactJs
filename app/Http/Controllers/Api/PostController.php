<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest as StoreRequest;
use App\Http\Requests\PostRequest as UpdateRequest;
use Backpack\CRUD\CrudPanel;
use App\Models\Post;
use Illuminate\Http\Response;

class PostController extends Controller
{
    // public function setup()
    // {
    //     /*
    //     |--------------------------------------------------------------------------
    //     | CrudPanel Basic Information
    //     |--------------------------------------------------------------------------
    //     */
    //     $this->crud->setModel('App\Models\Post');
    //     $this->crud->setRoute(config('backpack.base.route_prefix') . '/post');
    //     $this->crud->setEntityNameStrings('post', 'posts');

    //     /*
    //     |--------------------------------------------------------------------------
    //     | CrudPanel Configuration
    //     |--------------------------------------------------------------------------
    //     */

    //     // TODO: remove setFromDb() and manually define Fields and Columns
    //     $this->crud->setFromDb();

    //     // add asterisk for fields that are required in PostRequest
    //     $this->crud->setRequiredFields(StoreRequest::class, 'create');
    //     $this->crud->setRequiredFields(UpdateRequest::class, 'edit');
    // }
    public function store(Request $request)
    {
        // your additional operations before save here
        //$redirect_location = CrudController::updateCrud($request);
        // your additional operations after save here
        // use $this->data['entry'] or $this->crud->entry
        $data=$request->all();
        //$var = $data['date_birth'];
        //$data['date_birth']= date("Y-m-d", strtotime($var) );
        $post=new Post();

        $data=$post->create($data);
        //echo json_encode($data);
        

        return $data;
    }

    public function index()
    {
        $post = Post::select('title', 'id','content')->get();
        return response()->json($post);
    }

    public function update(Request $request)
    {
        var_dump(1);
       /*
        $data=$request->all();
        
        $contact=Post::find($id);

        $data=$contact->update($data);
        
        

        return Post::find($id);*/ return "";
    }
}