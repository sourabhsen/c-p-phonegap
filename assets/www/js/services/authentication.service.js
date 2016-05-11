
(function () {
 
 'use strict';

app.factory('AuthenticationService', AuthenticationService);
	
    AuthenticationService.$inject = ['$http','$cookieStore','$rootScope','$window', '$timeout','UserService'];
    function AuthenticationService($http,$cookieStore,$rootScope,$window, $timeout,UserService) {
        var service = {};
 
        service.Login = Login;
        service.GetToken = GetToken;
        service.GetPushId = GetPushId;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.SetToken = SetToken;
        service.LogOutService = LogOutService;
        service.AuthenticateDevice = AuthenticateDevice;

 
        return service;
 
        function Login(username, password,role, callback) {
                var response;
            $timeout(function(){
                UserService.GetByUsername(username,password,role)
                    .then(function (user) {

                        if (user !== null && user.token) {
                            response = { success: true,auth_token: user.token };
                        } else {
                            response = { success: false, message: 'Something went wrong please try after sometime' };
                        }
                        callback(response);
                    })
                    },1000);





 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
 
        }

        function GetToken(){
              var token = $window.sessionStorage.getItem('auth_key');
              if(token){
                return Base64.decode(token);
              }else{
                 return false;
              }
        }

        function GetPushId(){
          var Reg_id = $window.sessionStorage.getItem('PushRegid');
              if(Reg_id){
                console.log('sucessfully push id is stored');
                return Reg_id;
              }else{
                console.log('device is not registered')
                return null;
              }

        }
 
        function SetCredentials(username, password,token) {
            var authdata = Base64.encode(username + ':' + password);
            token = token ? token : 'Basic';
            var entoken  = Base64.encode(token);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata,
                    token: entoken
                }
            };
 
            $http.defaults.headers.common['token'] = token; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function SetToken(token){
           if(token){
              var deToken = Base64.encode(token);
              $window.sessionStorage.setItem('auth_key',deToken);
           }
        }
 
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $window.sessionStorage.clear();
            $http.defaults.headers.common.token = 'Basic';
        }

        function LogOutService(){
           UserService.LogOutSession()
              .then(function (response) {
                   $rootScope.globals = {};
                   $cookieStore.remove('globals');
                   $window.sessionStorage.clear();
                   $http.defaults.headers.common.token = 'Basic';
               })

        }

        function AuthenticateDevice(){
               var  isMobile = {
                   Android: function() {
                       return navigator.userAgent.match(/Android/i);
                   },
                   BlackBerry: function() {
                       return navigator.userAgent.match(/BlackBerry/i);
                   },
                   iOS: function() {
                       return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                   },
                   Opera: function() {
                       return navigator.userAgent.match(/Opera Mini/i);
                   },
                   Windows: function() {
                       return navigator.userAgent.match(/IEMobile/i);
                   },
                   any: function() {
                       return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                   }
               };
          return isMobile;
        }
    }
 
    // Base64 encoding service used by AuthenticationService
    var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };


 
})();