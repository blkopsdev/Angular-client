(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('docsService', docsService);

    docsService.$inject = ['$http', '$q', 'apiService'];

    /* @ngInject */
    function docsService($http, $q, apiService) {
        var service = {

        };
        return service;

        

    }

})();

