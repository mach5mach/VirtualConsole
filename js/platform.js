function platform()
{
    this.account;
    this.controllers = {};
    this.hardware;
}

platform.prototype.load = function()
{
    //load games into main screen
}

platform.prototype.onSignIn = function(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.googleapis.com/oauth2/v3/tokeninfo');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
      var response = JSON.parse(xhr.responseText);

      if(response.aud.includes(CLIENT_ID))
      {
        //good to go with Gooogle
        platform.onLogin(response.email);
      }
    };
    xhr.send('id_token=' + id_token);
  };

platform.prototype.signOut = function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

platform.prototype.onLogin = function(email) {
    //log in with email account
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './php/login.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      var response = xhr.responseText;

      //load account settings

      //change menu

    };
    xhr.send('email=' + email);

}

var platform = new platform();