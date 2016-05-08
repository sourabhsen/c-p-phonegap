'use strict';

/* Controllers */
  // signin controller
app.controller('TransactionController', ['$rootScope','$scope','$window', '$http', '$state','$stateParams','UserService', function($rootScope,$scope, $window, $http, $state,$stateParams,UserService) {

    $scope.authError = null;
    var dataObj ={
       token: $window.sessionStorage.getItem('auth_token'),
    }
    function init(){
       $scope.getStoreTransaction();
    }

    $scope.getStoreTransaction = function() {
      $scope.authError = null;
         // Try to login
          UserService.GetStoreTransaction(dataObj).then(function(response){
             if(response){
               $scope.strTransaction = response;
             }else{
               $scope.msg="something went rong";
             }

          });

       }

      init();

  }])
;