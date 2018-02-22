(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('feedService', feedService);

    feedService.$inject = ['$http', '$q', 'apiService'];

    /* @ngInject */
    function feedService($http, $q, apiService) {
        var service = {

        };
        return service;

    }

})();

