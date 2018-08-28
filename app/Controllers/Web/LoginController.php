<?php

namespace App\Controllers\Web;

use App\Controllers\BaseController;
use Infrastructure\Authentication;

class LoginController extends BaseController
{
    public function show(): void
    {
        $viewModel = [
            'pageTitle' => 'Login',
            'errors' => $this->getErrors(),
            'messages' => $this->getMessages(),
            'profile' => Authentication::getProfile()
        ];

        unset($_SESSION['error']);

        $this->renderWebView('/Login/login', $viewModel);
    }

    public function login(): void
    {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        if (Authentication::login($username, $password)) {
            header('Location: ?route=index');
        } else {
            $this->addError('Please enter valid credentials');

            header('Location: ?route=login');
        }
    }

    public function logout(): void
    {
        Authentication::logout();
        header("Location: {$_SERVER['HTTP_REFERER']}");
    }
}