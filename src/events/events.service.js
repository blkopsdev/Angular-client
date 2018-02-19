(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('eventsService', eventsService);

    eventsService.$inject = ['$http', '$q', 'apiService'];

    /* @ngInject */
    function eventsService($http, $q, apiService) {
        var service = {

        };
        return service;

        

    }

})();

