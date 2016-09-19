var index = 0;

angular.module('app').controller('requestController', ['$scope', '$http', '$location', 'login', '$rootScope',
function($scope, $http, $location, login, $rootScope)
{
  console.log("hello I am request");
  console.log(login.username);
  // changes which tab is marked as active
  $($("#nav").children().children('.current')).removeClass("current");
  $($("#nav").children().children()[1]).addClass("current");
  $scope.requests = [];

  $http.get('/requests/data', {
    headers:
    {
      "Authorization": "bearer " + login.jwt_token,
    }
  }).success(function(response)
  {
    console.log("it was a sucess:D::::D:D:D:D::");
    console.log(response);
    $scope.requests = response;
  });

  $scope.viewrequest = function(num)
  {
    index = num;
    console.log(num);
    $rootScope.$broadcast("sent-request", { index: num });
    $location.path('/viewrequest');
  }

}])
.controller('viewRequest', ['$scope', '$http', '$location', 'login',
function($scope, $http, $location, login)
{
  $scope.$on("sent-request", function(event, args)
  {
    console.log("we got the request");
    $scope.index = args.index;
  });
  $scope.username = login.username
  $http.get("/requests/data", {
    headers:
    {
      "Authorization": "bearer " + login.jwt_token,
    }
  }).success(function(response)
  {
    console.log("it was a sucess:D::::D:D:D:D:: " + index);
    $scope.request = (response[index]);
    console.log($scope.request._id);
  });
}]);
