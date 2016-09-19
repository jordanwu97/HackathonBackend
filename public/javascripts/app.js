var app = angular.module('app', ['Login', 'ngRoute']);

app.config(function($routeProvider)
{
  $routeProvider
  .when('/',
  {
    templateUrl: '../views/main.html',
    controller: 'homeController',
    access: {restricted: false}
  })
  .when('/requests',
  {
    templateUrl: '../views/request.html',
    controller: 'requestController',
    access: {restricted: true}
  })
  .when('/makerequest',
  {
    templateUrl: '../views/makerequest.html',
    controller: 'makeRequest',
    access: {restricted: true}
  })
  .when('/viewrequest',
  {
    templateUrl: '../views/viewrequest.html',
    controller: 'viewRequest',
    access: {restricted: true}
  })
  .when('/profile',
  {
    templateUrl: '../views/profile.html',
    controller: 'profileController',
    access: {restricted: true}
  })
  .when('/login',
  {
    templateUrl: '../views/login.html',
    controller: 'loginCtrl',
    access: {restricted: false}
  })
  .otherwise(
  {
    redirectTo: '/',
    access: {restricted: false}
  });
});

app.run(function ($rootScope, $location, $route, login)
{
  $rootScope.$on('$routeChangeStart',
  function(event, next, current)
  {
    if(next.access.restricted && !login.userIsLoggedIn())
    {
        $location.path('/login');
        $route.reload();
    }
  });
});
