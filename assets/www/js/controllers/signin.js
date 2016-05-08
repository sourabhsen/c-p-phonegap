'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$window', '$state','AuthenticationService', function($scope, $http,$window, $state,AuthenticationService) {
    $scope.user = {};
    $scope.authError = null;
    
    function init(){
      // reset login status
      AuthenticationService.ClearCredentials();
      //AuthenticationService.getToken();
    };

    $scope.login = function() {
      $scope.authError = null;
      // Try to login
       
      
      AuthenticationService.Login($scope.user.email, $scope.user.password,$scope.form.role, function (response) {
            if (response.success) {

            //  var pushNotification = window.plugins.pushNotification;
            //      pushNotification.register(cnp.successHandler, cnp.errorHandler,{"senderID":"126143679531","ecb":"cnp.onNotificationGCM"});

                 AuthenticationService.SetCredentials($scope.user.email, $scope.user.password,response.auth_token);
                 $http.defaults.headers.common['token'] = response.auth_token;

                 $window.sessionStorage.setItem('auth_token',response.auth_token);
                    $state.go('lockme');
                  //$state.go('app.dashboard-v1');

            } else {
                  $scope.authError = response.message;
                  vm.dataLoading = false;
            }
        });

    };
   
    init();

  }])
;