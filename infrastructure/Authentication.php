<?php
/**
 * Created by PhpStorm.
 * User: Oskar
 * Date: 06/08/2018
 * Time: 11:16
 */

namespace Infrastructure;


class Authentication
{
    public static function login(string $username, string $password): bool
    {
        if ($username === 'oskar' && $password === 'oskar') {
            $_SESSION['profile'] = array(
                'userId' => '1',
                'userName' => 'oskar',
                'userFullName' => 'Oskar Kohler',
            );
            return true;
        }

        return false;
    }


public static function logout() {
    session_destroy();
}

public static function isLoggedIn() {
        return isset($_SESSION['profile']);
}

public static function getProfile() {
        return $_SESSION['profile'] ?? null;
}

}