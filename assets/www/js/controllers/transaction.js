'use strict';

/* Controllers */
  // signin controller
app.controller('TransactionController', ['$scope', '$http', '$state','UserService', function($scope, $http, $state,UserService) {

    $scope.authError = null;

    function init(){
       $scope.getStoreTransaction();
    };

    $scope.getStoreTransaction = function() {
      $scope.authError = null;
         // Try to login
          UserService.GetStoreTransaction().then(function(response){
             debugger;
             console.log(response);


          });

          }

    init();

  }])
;