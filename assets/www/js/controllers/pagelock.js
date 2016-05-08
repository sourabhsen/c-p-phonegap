'use strict';

/* Controllers */
  // signin controller
app.controller('PageLockController', ['$scope', '$http','$window', '$state','UserService', function($scope, $http, $window, $state,UserService) {

    $scope.authError = null;
    $scope.userAuthenticate = function(code) {
       $scope.authError = null;
      // code = parseInt(code);
       var dataObj = {
          passcode:   code,
          macid : 1234,
          device : 0,
          token: $window.sessionStorage.getItem('auth_token'),
          ipaddress : '124.122.0.0'
       }


        UserService.GetPasscodeAuthentication(dataObj).then(function(response){
           if(response.error != null){
               $scope.authError = response.error;
           }else{
               $state.go('app.dashboard-v1');
                $http.defaults.headers.common['token'] = response.token;
           }
        });
    };
  }])
;