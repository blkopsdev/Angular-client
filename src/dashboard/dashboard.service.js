(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$http', '$q', 'apiService'];

    /* @ngInject */
    function dashboardService($http, $q, apiService) {
        var service = {
            fetchApps: fetchApps
        };
        return service;

        
        function fetchApps() {
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/self/apps'),
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }
    }

})();

