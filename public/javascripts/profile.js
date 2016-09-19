angular.module('app').controller('profileController', ['$scope', '$http', '$location',
function($scope, $http, $location)
{
  $($("#nav").children().children('.current')).removeClass("current");
  $($("#nav").children().children()[2]).addClass("current");
}]);
