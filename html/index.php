<?php


//$pdo = new \PDO('mysql:host=localhost;dbname=books', 'root', '');


use App\Controllers\Web\BookController;
use App\Controllers\Web\LoginController;
use Dotenv\Dotenv;
use Infrastructure\LogManager;

require __DIR__ .  '/../vendor/autoload.php';

session_start();

$dotenv = new Dotenv(__DIR__ . '/../');
$dotenv->load();


function handleExceptions(Throwable $oException)
{
    LogManager::log('alert','Unhandled exception: ' . $oException->getMessage() . ' - ' . $oException->getTraceAsString());
}
set_exception_handler('handleExceptions');

function handleErrors($iErrorNumber, $sError, $sErrorFile, $iErrorLine)
{
    throw new ErrorException($sError, $iErrorNumber, 0, $sErrorFile, $iErrorLine);
}
set_error_handler('handleErrors');

/*
use App\Models\book;

$book = new book();
var_dump($book->all());*/

function view ($view, $viewModel)
{
    include __DIR__ . '/../app/Views/layout.php';
}

$route = $_GET['route']??"index";
$id = $_GET['id']??null;
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($route == "index") {
        $bookController = new BookController();
        $bookController->index();
    } elseif ($route == "show" && $method == "GET") {
        $bookController = new BookController();
        $bookController->show($id);
    } elseif ($route == "edit" && $method == "GET") {
        $bookController = new BookController();
        $bookController->edit($id);
    } elseif ($route == "edit" && $method == "POST") {
        $bookController = new BookController();
        $bookController->update($id);
    } elseif ($route == "create" && $method == "GET") {
        $bookController = new BookController();
        $bookController->create();
    } elseif ($route == "create" && $method == "POST") {
        $bookController = new BookController();
        $bookController->store($_POST);
    } elseif ($route == "delete") {
        $bookController = new BookController();
        $bookController->destroy($id);
    } elseif ($route == "login" && $method == "GET") {
        $loginController = new Logincontroller();
        $loginController->show();
    } elseif ($route == "login" && $method == "POST") {
        $loginController = new Logincontroller();
        $loginController->login();
    } elseif ($route == "logout") {
        $loginController = new Logincontroller();
        $loginController->logout();
    } elseif ($route == 'upload-image' && $method == 'POST') {
        $bookController = new BookController();
        $bookController->uploadImage($id);
    }

}
catch (Exception $exception) {
    http_response_code(500);
}



/*
echo '<br /><br />';
echo '<pre>';
print_r($_SESSION);
echo '<br />';*/