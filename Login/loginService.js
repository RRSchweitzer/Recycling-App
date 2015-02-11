var app = angular.module('mapTrack')

app.service('loginService', function(){
  //Just a reference to the firebase endpoint
  var firebaseUrl = 'https://favoritepins.firebaseio.com/login'
  //Creates an object using the Firebase Constructor with our endpoint passed in
  var firebaseLogin = new Firebase(firebaseUrl);

  

  //login method to be called from our controller. The callback is then passed the authenticated user
  this.login = function(user, cb){
  	var loginCallback = function(err, authData) {
    if (err) {
      switch (err.code) {
        case "INVALID_EMAIL":
          // handle an invalid email
          case "INVALID_PASSWORD":
          // handle an invalid password
          default:
        }
    } else if (authData) {
        // user authenticated with Firebase
        console.log("Logged In! User ID: " + authData.uid);
        cb(authData); //gives the authenticated user to our callback
    }
  };
    firebaseLogin.authWithPassword({
      email : user.email,
      password : user.password
    }, loginCallback);
  };

  //Step 3 of Registration
  this.register = function(user, cb){
    firebaseLogin.createUser({
      email: user.email,
      password: user.password
    }, function(error) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
          }
        } else {
            console.log("User created successfully");
            firebaseLogin.authWithPassword({
              email : user.email,
              password : user.password
            }, function(err, authData) {
                if (err) {
                  switch (err.code) {
                    case "INVALID_EMAIL":
                      // handle an invalid email
                      case "INVALID_PASSWORD":
                      // handle an invalid password
                      default:
                    }
                } else if (authData){
                    authData.name = user.name;
                    authData.timestamp = new Date().toISOString();
                    firebaseLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
                    cb(authData);
                }
              });
        }
    });
  };
});