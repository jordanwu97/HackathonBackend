var app = angular.module('Login', []);

app.factory('login', ['$http', function($http){ //create a factory "stores" that
// will hold the variable stores, as well as http functions
  var user = {}
//http post for login
  user.login = function(name, pwd, callback, callback2) {
      body = {
          username : name,
          password : pwd
      }
      $http.post('/users/login', body).then(function(data) {
            // console.log(data.data.message);
            user.jwt_token = data.data.token;
            user.username = body.username;
            console.log(user.jwt_token);
            callback();
      });
  }

  user.register = function(name, pwd, email, callback)
  {
    body = {
      username : name,
      password : pwd,
      email : email
    }
    $http.post('/users/register', body).then(function(data)
    {
      user.jwt_token = data.data.token;
      user.username = body.username;
      callback();
    });
  }

  user.userIsLoggedIn = function() {
      if(user.jwt_token == null) {
          return false
      }
      else {
          return true
      }
  }
  return user;
}]);

app.controller('loginCtrl', ['$scope', '$http', 'login', '$location',
  function($scope, $http, login, $location) {
    $($("#nav").children().children('.current')).removeClass("current");
    $($("#nav").children().children()[3]).addClass("current");
    $scope.loginForm = {
        username : '',
        password : ''
    };
    $scope.submitlogin = function() {
        login.login($scope.loginForm.username, $scope.loginForm.password, function(){
            $scope.login = login;
            console.log(login.userIsLoggedIn());
            $location.path('/requests');
        });
        $scope.errorMessage = "Incorrect username/password";
    }

    $scope.submitregister = function()
    {
      login.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.email, function()
      {
        $location.path('/requests');
      });
    }
    console.log(login.userIsLoggedIn())
}]);
