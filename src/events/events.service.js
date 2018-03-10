(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('eventsService', eventsService);

    eventsService.$inject = [
        '$q',
        'apiService'
    ];

    /* @ngInject */
    function eventsService(
        $q,
        apiService
    ) {
        var service = {
            getEvents: getEvents
            // ,postFeed: postFeed
        };
        return service;

        function getEvents(caseId) {
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

