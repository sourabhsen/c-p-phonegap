'use strict';

/* Controllers */
  // signin controller
app.controller('PageLockController', ['$scope', '$http', '$state','UserService', function($scope, $http, $state,UserService) {

    $scope.authError = null;
    $scope.userAuthenticate = function(code) {
       $scope.authError = null;
       code = parseInt(code);
        UserService.GetPasscodeAuthentication(code).then(function(response){
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