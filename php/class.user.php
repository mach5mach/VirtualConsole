<?php
class user
{
    private $db;
 
    function __construct($dbcon)
    {
      $this->db = $dbcon;
    }
 
    public function register($username,$useremail,$userpass)
    {
       try
       {
           $hashed_password = password_hash($userpass, PASSWORD_DEFAULT);
   
	   $sqlstatement = "INSERT INTO users(username, email, password)VALUES(:username, :useremail, :userpass)";

           $stmt = $this->db->prepare($sqlstatement);
              
           $stmt->bindparam(":username", $username);
           $stmt->bindparam(":useremail", $useremail);
           $stmt->bindparam(":userpass", $hashed_password);            
           $stmt->execute(); 
   
           return $stmt; 
       }
       catch(PDOException $e)
       {
           echo $e->getMessage();
       }    
    }
 
    public function login($username,$useremail,$userpass)
    {
       try
       {
	  $sqlstatement = "SELECT * FROM users WHERE username=:username OR email=:useremail LIMIT 1";

          $stmt = $this->db->prepare($sqlstatement);
          $stmt->execute(array(':username'=>$username, ':useremail'=>$useremail));
          $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
          if($stmt->rowCount() == 1)
          {
             if(password_verify($userpass, $userRow['password']))
             {
                $_SESSION['user_session'] = $userRow['user_id'];
                return true;
             }
             else
             {
                return false;
             }
          }
       }
       catch(PDOException $e)
       {
           echo $e->getMessage();
       }
   }
 
   public function isloggedin()
   {
      if(isset($_SESSION['user_session']))
      {
         return true;
      }
   }
 
   public function redirect($url)
   {
       header("Location: $url");
   }
 
   public function logout()
   {
        session_destroy();
        unset($_SESSION['user_session']);
        return true;
   }
}
?>