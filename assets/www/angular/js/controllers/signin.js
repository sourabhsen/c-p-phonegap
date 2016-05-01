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
            if (true) {
                 AuthenticationService.SetCredentials($scope.user.email, $scope.user.password);
                 $state.go('app.dashboard-v1');
            } else {
                  $scope.authError = 'Server Error';
                  vm.dataLoading = false;
            }
        });

    };
   
    init();

  }])
;