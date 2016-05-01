
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
            debugger;
            var url = $location.protocol() + '://' + 'www.clickandpayindia.com'/*$location.host()*/;

            if ($location.port() !== 80) {
                url += ':' + $location.port();
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