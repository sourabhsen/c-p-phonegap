'use strict';

/* Controllers */
  // signin controller
app.controller('TransactionController', ['$rootScope','$scope','$window', '$http', '$state','$stateParams','UserService','AuthenticationService', function($rootScope,$scope, $window, $http, $state,$stateParams,UserService,AuthenticationService) {

    $scope.authError = null;
    var detoken = AuthenticationService.GetToken();

    if(detoken){
       var dataObj = detoken;

    }else{
       $scope.showError = true;
       $scope.msg="something went rong";
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