<?php
require_once '../../google-api-php-client-2.1.1_PHP54/vendor/autoload.php';

$id_token = $_POST['idtoken'];
$CLIENT_ID = "670460339392-3mf3cafojsfqshbsrj8g99cqnst82ija";

$client = new Google_Client(['client_id' => $CLIENT_ID]);
$payload = $client->verifyIdToken($id_token);
if ($payload) {
  $userid = $payload['sub'];
  // If request specified a G Suite domain:
  //$domain = $payload['hd'];
  print($userid);
} 
else {
  // Invalid ID token
  print("error");
}

?>