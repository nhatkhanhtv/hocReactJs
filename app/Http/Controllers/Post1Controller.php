<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Post1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function noiChuoiTest(Request $request)
    {
        // $search_term = $request->input('searchQuery');
        // $rowsPerPage = $request->per_page;
        
        // if ($search_term!="undefined") {
        //     $results = Group::select('*')->where('name', 'LIKE', '%'.$search_term.'%')->orderBy('id','desc')->paginate($rowsPerPage);
        // } else {
        //     $results = Group::select('*')->orderBy('id','desc')->paginate($rowsPerPage);
        // }
        $input = $request->input('text1')." -- text2: ".$request->input('text2');
        return $input;
    }

    public function index()
    {
        $a = [];
        for($i=1;$i<10;$i++){
            $a[] = [
                'id'=>"P".$i,
                'title'=>'Post '.$i
            ];
        }
        $response = json_encode($a);
        return $response ;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
