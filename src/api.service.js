(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('apiService', apiService);

    apiService.$inject = [
        'APP_API_URL'
        ,'DYNAMIC_CDN_API_URL'
        ,'utils'
        ,'$http'
        ,'$q'
        ,'$log'
    ];

    function apiService(
        APP_API_URL
        ,DYNAMIC_CDN_API_URL
        ,utils
        ,$http
        ,$q
        ,$log
    ) {
        var service = {
            getApiUrl: getApiUrl
            ,getDynamicCdnUrl: getDynamicCdnUrl
            ,getData: getData
            ,getOptionsUrl: getOptionsUrl
            ,getApiData: getApiData
        };

        return service;

        function getApiUrl(path) {
            path = path || '';
            return APP_API_URL + '/' + utils.get_host() + path;
        }
        function getDynamicCdnUrl(path){
            path = path || '';
            return DYNAMIC_CDN_API_URL + path;
        }

        function getData(response){
            return response.data;
        }

        function getOptionsUrl(path,locale){
            return '/options/'+ locale + path +'.json'
        }

        function getApiData(path, params) {
            var deferred = $q.defer();

            $http.get(getApiUrl(path), params).then(function(res) {
                deferred.resolve(getData(res));
            }, function(err) {
                deferred.reject(err);
                console.log(err);
            });

            return deferred.promise;
        }
    }

})();