'use strict';

/* Controllers */
  // signin controller
app.controller('PageLockController', ['$scope', '$http','$window', '$state','UserService','AuthenticationService', function($scope, $http, $window, $state,UserService,AuthenticationService) {

    $scope.authError = null;
    $scope.userAuthenticate = function(code) {
       $scope.authError = null;

    var  token_value =  AuthenticationService.GetToken();
    var  reg_id      =  AuthenticationService.GetPushId();
    var  pushid      =  AuthenticationService.GetPushId();
    var  isMobile    =  AuthenticationService.AuthenticateDevice();
    var   device       = (isMobile.Android()) ? 0 :  1;
             // code = parseInt(code);
       var dataObj = {
          passcode:   code,
          macid : 1234,
          device : device,
          token: token_value,
          pushid: pushid,
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