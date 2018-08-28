<?php

namespace App\Controllers\Web;

use App\Controllers\BaseController;
use App\Models\Book;
use Infrastructure\Authentication;

class BookController extends BaseController
{

    public function validate()
    {
    }

    public function index()
    {
        $book = new Book();

        $viewModel = [
            'pageTitle' => "Books",
            'books' => $book->all(),
            'errors' => $this->getErrors(),
            'messages' => $this->getMessages(),
            'profile' => Authentication::getProfile(),
        ];

        $this->renderWebView('/Books/listing', $viewModel);
    }


    public function show($id = 0)

    {
        $book = new Book();

        $imagePath = '';
        if (file_exists(__DIR__ . '/../../../html/images/' . $id . '.jpg')) {
            $imagePath = 'images/' . $id . '.jpg';
        }

        $viewModel = [
            'pageTitle' => "Book",
            'book' => $book->one($id),
            'errors' => $this->getErrors(),
            'messages' => $this->getMessages(),
            'profile' => Authentication::getProfile(),
            'imagePath' => $imagePath,
        ];

        $this->renderWebView('/Books/details', $viewModel);
    }

    public function edit($id = 0)

    {
        $book = new Book();

        $viewModel = [
            'pageTitle' => "Edit book",
            'book' => $book->one($id),
            'errors' => $this->getErrors(),
            'messages' => $this->getMessages(),
            'profile' => Authentication::getProfile(),
        ];

        $this->renderWebView('/Books/update-book', $viewModel);
    }


    public function create()

    {

        $viewModel = [
            'pageTitle' => "Create a book",
            'errors' => $this->getErrors(),
            'messages' => $this->getMessages(),
            'profile' => Authentication::getProfile(),
        ];

        $this->renderWebView('/Books/new-book', $viewModel);
    }

    public function update($fields = [], $id = 0)

    {
        $book = new Book();
        $id = $book->save($fields, $id);

        $this->addMessage('Book succesfully updated');

        header("Location: ?route=show&id={$id}");
        exit;

    }


    public function store($fields = [])

    {
        $book = new Book();
        $id = $book->save($fields);
        header("Location: ?route=show&id={$id}");
        exit;

    }

    public function destroy($fields = [])

    {


    }

    public function uploadImage($id): void
    {
        $imageFile = $_FILES['imageFile'] ?? null;

        if (!$imageFile || $imageFile['error'] > 0) {
            $this->addError('There was an error while extracting the image');
            header('Location: ?route=show&id=' . $id);
        }
        else if (!in_array($imageFile['type'], array('image/png', 'image/jpeg'))) {
            $this->addError('The supplied image was not of type PNG or JPEG');
            header('Location: ?route=show&id=' . $id);
        }

        else {
            $targetImageFile = __DIR__ . '/../../../html/images/' . $id . '.jpg';

            rename($imageFile['tmp_name'], $targetImageFile);
            header('Location: ?route=show&id=' . $id);

        }
    }

}