<?php

namespace App\Controllers;

abstract class BaseController
{
    private $errors = [];
    private $messages = [];

    public function __construct()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'] ?? '';

        if ($requestMethod === 'GET') {
            $this->errors = $_SESSION['errors'] ?? [];
            $this->messages = $_SESSION['messages'] ?? [];

            unset($_SESSION['errors']);
            unset($_SESSION['messages']);
        }
    }

    public function __destruct()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'] ?? '';

        if ($requestMethod === 'POST') {
            $_SESSION['errors'] = $this->errors;
            $_SESSION['messages'] = $this->messages;
        }
    }

    public function addError(string $error) : void
    {
        $this->errors[] = $error;
    }

    public function getErrors() : array
    {
        return $this->errors;
    }

    public function addMessage(string $message) : void
    {
        $this->messages[] = $message;
    }

    public function getMessages() : array
    {
        return $this->messages;
    }

    public function renderWebView(string $view, array $viewModel) : void
    {
        include __DIR__ . '/../../app/Views/layout.php';
    }

    public function renderJson($statusCode, $data = null) : void
    {
        http_response_code($statusCode);
        if ($data) {
            echo json_encode($data);
        }
    }
}