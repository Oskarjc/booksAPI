<?php

namespace App\Controllers\API;

use App\Controllers\BaseController;
use App\Models\Book;

class BookVoteController extends BaseController
{


    public function show($id = 0)

    {
        $book = new Book();
        $book = $book->one($id);

        if ($book) {
            $response = [
                'status_code' => 200,
                'status_message' => '',
                'total' => 1,
                'votes' => $book['votes']
            ];
        } else {
            $response = [
                'status_code' => 404,
                'status_message' => 'Book ' . $id . ' not found',
                'total' => 0,
                'votes' => null
            ];
        }

        $this->renderJson($response);

    }


    public function store($id = 0)


    {
        $book = new Book();
        $foundbook = $book->one($id);

        if ($foundbook) {
            $book->upVote($id);
            $foundbook = $book->one($id);
            $response = [
                'status_code' => 200,
                'status_message' => 'DESTROY',
                'total' => 0,
                'votes' => $foundbook['votes']
            ];
        } else {
            $response = [
                'status_code' => 404,
                'status_message' => 'Book ' . $id . ' not found',
                'total' => 0,
                'votes' => null
            ];
        }

        $this->renderJson($response);

    }


    public function destroy($id = 0)

    {
        $book = new Book();
        $foundbook = $book->one($id);

        if ($foundbook) {
            $book->downVote($id);
            $foundbook = $book->one($id);
            $response = [
                'status_code' => 200,
                'status_message' => 'DESTROY',
                'total' => 0,
                'votes' => $foundbook['votes']
            ];
        } else {
            $response = [
                'status_code' => 404,
                'status_message' => 'Book ' . $id . ' not found',
                'total' => 0,
                'votes' => null
            ];
        }

        $this->renderJson($response);

    }


}