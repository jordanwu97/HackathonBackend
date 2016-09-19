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

  $http.get(/*"http://hackathonbackend-dev.us-east-1.elasticbeanstalk.com*/'/requests/data', {
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
  //
  // $http.get('http://localhost:3000/posts.json', {
  //     headers: {
  //         "Authorization": 'Token token="1111"'
  //     }
  //   }).success(function(response){
  //     console.log(response)
  //   });

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
  // console.log("hello I am viewing request");
  // // $scope.requests.pictures = [];
  // $scope.$watch('login.username', function() {
  //       $scope.usrname = login.username;
  //   });
  // // $scope.usrname = login.username;



  // console.log($($("nav").children()[2]).addClass("current"));
  // $("#nav").children()[0].children()[1].addClass("current");
}]);
