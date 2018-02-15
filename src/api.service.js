(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('apiService', apiService);

    apiService.$inject = [
    	'MANAGE_API_URL'
		,'DYNAMIC_CDN_API_URL'
		,'utils'
	];

    function apiService(
        MANAGE_API_URL
		,DYNAMIC_CDN_API_URL
		,utils
	) {
        var service = {
            getApiUrl: getApiUrl
			,getDynamicCdnUrl: getDynamicCdnUrl
			,getData: getData
			,getOptionsUrl: getOptionsUrl
        };

        return service;

        function getApiUrl(path) {
			path = path || '';
            return MANAGE_API_URL + '/' + utils.get_host() + path;
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
    }

})();

