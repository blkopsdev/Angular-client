(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('caseService', caseService);

    caseService.$inject = [
        ,'$http'
        ,'APP_API_URL'
        ,'utils'
    ];

    function caseService(
        ,$http
        ,APP_API_URL
        ,utils
    ) {
        var service = {
            getCases: getCases
        };

        function getCases() {
            var path = APP_API_URL + '/' + utils.get_host() + '/cases';
            return $http.get(path, {});
        }

        return service;
    }

})();

