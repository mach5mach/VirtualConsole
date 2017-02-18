<?php
    require_once "dbconfig.php";

    $email = $_POST['email'];

     try
       {
	      $sqlstatement = "SELECT * FROM accounts WHERE email=:email";

          $stmt = $dbcon->prepare($sqlstatement);
          $stmt->execute(array(':email'=>$email));
          $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
          if($stmt->rowCount() > 0)
          {
              //email exists
//              $_SESSION['user_session'] = $userRow['user_id'];
                
          }
          else
          {
              $sqlstatement = "INSERT INTO `accounts`(`email`) VALUES (:email)";

              $stmt = $dbcon->prepare($sqlstatement);
              $stmt->bindparam(":email", $email);
              $stmt->execute();
          }
       }
       catch(PDOException $e)
       {
           echo $e->getMessage();
       }

       return true;

?>