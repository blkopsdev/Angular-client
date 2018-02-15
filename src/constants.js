(function () {
    'use strict';

    angular.module('caClient')
        .constant('CONST', constants());

    function constants() {
        return {
            APP_VERSION: '1.10.2',
            HTTP: {
                STATUSES: {
                    UNAUTHORIZED: 401,
                    ACCESS_DENIED: 403,
                    NOT_FOUND: 404,
                    ERROR: 500,
                    OFFLINE: 0,
                    CORS_ERROR: -1
                }
            },
            EVENTS: {
                SUCCESS: 'SUCCESS',
                FORBIDDEN: 'ACCESS_DENIED',
                UNAUTHORIZED: 'UNAUTHORIZED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR'
            },

            getTemplateUrl: function (path) {
                return path;
            }
        }
    }

})();