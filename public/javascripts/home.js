angular.module('app').controller('homeController', ['$scope', '$http', '$location', 'login',
function($scope, $http, $location, login)
{
  console.log("hello I am home");
  $($("#nav").children().children('.current')).removeClass("current");
  $($("#nav").children().children()[0]).addClass("current");
  console.log(login.userIsLoggedIn());

  // console.log($($("nav").children()[2]).addClass("current"));
  // $("#nav").children()[0].children()[1].addClass("current");
}]);
