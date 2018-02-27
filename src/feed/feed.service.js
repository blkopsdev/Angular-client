(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('feedService', feedService);

    feedService.$inject = [
        '$q',
        'apiService'
    ];

    /* @ngInject */
    function feedService(
        $q,
        apiService
    ) {
        var service = {
            getFeed: getFeed
            // ,postFeed: postFeed
        };
        return service;

        function getFeed(caseId) {
            debugger;
            var path = '/' + caseId + '/feed';
            var deferred = $q.defer();
            apiService.getApiData(path, {}).then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }
        /*function postFeed(caseId) {
            var path = '/' + caseId + '/feed';
            vm.data = apiService.postApiData(path, {});
        }*/
    }

})();

