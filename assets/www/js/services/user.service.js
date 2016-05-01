
(function () {
 
 'use strict';

app.factory('UserService', UserService);
	
    UserService.$inject = ['$http','$q','environmentUtil'];
    function UserService($http,$q,environmentUtil) {
        var service = {};
 
      
       
        service.GetByUsername = GetByUsername;
        service.GetAuthToken = GetAuthToken;
    
 
        return service;
 
    
        function GetByUsername(uname,pkey) {
                var deferredGet = $q.defer();
                var restUrl = 'http://54.169.220.89:8080/clickandpay/login';
                var dataObj = {
                    username: uname,
                    password: pkey,
                    role: 'POS'
                };   

               var httpConfig = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    method: 'POST',
                    params: dataObj,
                    url:  restUrl
                };

              $http(httpConfig).success(function (data) {
                deferredGet.resolve(data);
            }).error(function (error) {
               deferredGet.resolve(error);
           });

             return deferredGet.promise;


        }

        function GetAuthToken(){
            var deferredGet = $q.defer();
            var restUrl = '/clickandpay/myacc/login';



            $http({
                  method: 'GET',
                  url: environmentUtil.getMCAppUrl() + restUrl
            }).then(function successCallback(response) {
                    deferredGet.resolve(response);
            }, function errorCallback(response) {
                    deferredGet.reject(response);
            });

             return deferredGet.promise;
         
        }
        
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();