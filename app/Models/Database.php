<?php

namespace App\Models;

use PDO;

class Database
{

    private $conn;
    private $host;
    private $user;
    private $password;
    private $baseName;
    private $port;

    function __construct($params = [])
    {
        $this->conn = false;
        $this->host = getenv('DB_HOST'); //hostname
        $this->user = getenv('DB_USERNAME'); //username
        $this->password = getenv('DB_PASSWORD'); //password
        $this->baseName = getenv('DB_NAME'); //name of your database
        $this->port = '3306';
        $this->debug = true;
        $this->connect();
    }

    function __destruct()
    {
        $this->disconnect();
    }

    function connect()
    {
        if (!$this->conn) {
            $this->conn = new \PDO('mysql:host=' . $this->host . ';dbname=' . $this->baseName . '', $this->user, $this->password, array(\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        return $this->conn;
    }

    function disconnect()
    {
        if ($this->conn) {
            $this->conn = null;
        }
    }

    public function getOne($query, $params = [])
    {
        $result = $this->conn->prepare($query);
        $ret = $result->execute($params);

        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $response = $result->fetch();

        return $response;
    }

    public function getAll($query, $params = [])
    {
        $result = $this->conn->prepare($query);
        $ret = $result->execute($params);

        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $response = $result->fetchAll();

        return $response;
    }

    public function execute($query, $params = [])
    {
        $execute = $this->conn->prepare($query);
        $execute->execute($params);
        return $this->conn;
    }
}