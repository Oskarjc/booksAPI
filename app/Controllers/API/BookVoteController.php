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
            $this->renderJson(200, $foundbook['votes']);

        } else {
            $this->renderJson(404);

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
            $this->renderJson(200, $foundbook['votes']);

        } else {
            $this->renderJson(404);

        }



    }


    public function destroy($id = 0)

    {
        $book = new Book();
        $foundbook = $book->one($id);

        if ($foundbook) {
            $book->downVote($id);
            $foundbook = $book->one($id);
            $this->renderJson(200, $foundbook['votes']);

        } else {
            $this->renderJson(404);
        }

        $this->renderJson($response);

    }


}