<?php
session_start();

$dbhost = "/cloudsql/documentation-1213:documentationsql1";
$dbuser = "root";
$dbpass = "H0tD0gs!";
$dbname = "documentationdb";
$dbcon = null;

try
{
    //if (isset($_SERVER['SERVER_SOFTWARE']) &&
    //strpos($_SERVER['SERVER_SOFTWARE'], 'Google App Engine') !== false) {

            // Connect from App Engine.
            try {
            $dbcon = new pdo("mysql:unix_socket={$dbhost};dbname={$dbname}", $dbuser, $dbpass);
            $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $ex) {
            die('Unable to connect to Cloud SQL.');
             }
    /*}
     else {

            // Connect from a development environment.
            try {
            $dbcon = new pdo('mysql:host=127.0.0.1:3306;dbname=documentationdb', 'root', 'H0tD0gs!');
            $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $ex) {
            die('Unable to connect to local SQL');
             }
     }*/

}
catch(PDOException $e)
{
     echo $e->getMessage();
}


include_once 'class.user.php';
$user = new user($dbcon);