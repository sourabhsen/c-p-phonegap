
(function () {   
 
'use strict';

app.factory('environmentUtil', environmentUtil);

  environmentUtil.$inject = ['$location'];

  function environmentUtil($location) {
        /**
         * Location url.
         */
        function getUrl()
        {

            var url = /*$location.protocol() +*/  'http://' + '54.169.220.89:8080'/*$location.host()*/;

            if ($location.port() !== 80) {
              //  url += ':' + $location.port();
            }
            return url;
        }

        return {

            /**
             * Configures the CCS url.
             */
            getMCUrl: function () {

                return getUrl() + '/mcrequest';
            },

            /**
             * Configures the API url.
             */
            getAPIUrl: function () {

                return getUrl().replace('mc', 'api').replace('rentengine', 'mynewplace') + '/v2';
            },
            getMCAppUrl: function () {
                return getUrl();
            }
        };
    };

})();