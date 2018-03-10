(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$http', '$q', 'apiService'];

    /* @ngInject */
    function dashboardService($http, $q, apiService) {
        var service = {

        };
        return service;

        

    }

})();

