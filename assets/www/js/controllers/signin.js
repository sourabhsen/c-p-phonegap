'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$window', '$state','AuthenticationService', function($scope, $http,$window, $state,AuthenticationService) {
    $scope.user = {};
    $scope.authError = null;
    
    function init(){
      // reset login status
     // AuthenticationService.ClearCredentials();
      AuthenticationService.LogOutService();
      //AuthenticationService.getToken();
    };

    $scope.login = function() {
      $scope.authError = null;
      // Try to login
       
      
      AuthenticationService.Login($scope.user.email, $scope.user.password,$scope.form.role, function (response) {
            if (response.success) {

                 AuthenticationService.SetCredentials($scope.user.email, $scope.user.password,response.auth_token);
                 AuthenticationService.SetToken(response.auth_token);

                 $http.defaults.headers.common['token'] = response.auth_token;

                 $state.go('lockme');
                 //$state.go('app.dashboard-v1');

            } else {

                  $scope.authError = response.message;

            }
        });

    };
   
    init();

  }])
;