angular.module('app').controller('makeRequest', ['$scope', '$http', '$location', 'login',
function($scope, $http, $location, login)
{
  console.log("hello I am making request");
  $scope.requestForm = {};
  console.log(login.jwt_token);
  $scope.submitrequest = function()
  {
    var file = document.querySelector('input[type="file"]').files[0];
    // console.log(file);
    var base64Str = getBase64(file, function(stng){
      var toSendStr = stng.substring(stng.indexOf(",")+1);
      console.log(toSendStr);
      $http.post('/requests/new_request_farmer',
      {
        agronomistusername: "admin",
        comment: $scope.requestForm.comment
      },
      {
       headers:
       {
         "Authorization": "bearer " + login.jwt_token,
         "farmerusername": login.username
       }
      }).then(function(response)
      {
        console.log("Response " + response);
        $location.path('/#requests');
      });
    });

    // console.log(toSendStr);
    // console.log("Authorization " + "Bearer " + login.jwt_token);

  };
  // console.log($($("nav").children()[2]).addClass("current"));
  // $("#nav").children()[0].children()[1].addClass("current");
}]);


function getBase64(file, cb) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     cb(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}


function recursiveImageUpload(pic_arr ,callback, url_arr) {
  if(url_arr.length == pic_arr.length){
    return url_arr;
  }
  else {
  $http.post('/imageupload',{
    //body
    "body":pic_arr[url_arr.length-1]
  },
  {
     headers:
     {
       "Authorization": "bearer " + login.jwt_token,
       "farmerusername": login.username
     }
  })
  .then(function(res) {
    url_arr.push(res);
  })
  .then(recursiveImageUpload(pic_arr, callback, url_arr))
  }
}
