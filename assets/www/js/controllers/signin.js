'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','AuthenticationService', function($scope, $http, $state,AuthenticationService) {
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
       
      
      AuthenticationService.Login($scope.user.email, $scope.user.password, function (response) {
            if (response.success) {

                 var pushNotification = window.plugins.pushNotification;
                     pushNotification.register(cnp.successHandler, cnp.errorHandler,{"senderID":"126143679531","ecb":"cnp.onNotificationGCM"});
                     AuthenticationService.SetCredentials($scope.user.email, $scope.user.password);
                     $state.go('app.dashboard-v1');
            } else {
                  $scope.authError = response.message;
                  vm.dataLoading = false;
            }
        });

    };
   
    init();

  }])
;