(function(angular) {
	'use strict';

	angular
		.module('caClient')
		.factory('utils', utils);

	utils.$inject = [
		'$q'
		,'$log'
		,'$location'
	];

	function utils(
		$q
		,$log
		,$location
	) {
		var service = {
			omit: omit
			,pick: pick
			,get_host:get_host
		};

		function omit(obj,props){
			if(angular.isArray(obj)){
				return obj.map(function(o){
					return omit(o,props);
				});
			}

			var result = angular.copy(obj);

			props.forEach(function(prop){
				delete result[prop];
			});

			return result;
		}

		function pick(obj,props){
			if(angular.isArray(obj)){
				return obj.map(function(o){
					return pick(o,props);
				});
			}

			var result = {};

			props.forEach(function(prop){
				result[prop] = angular.copy(obj[prop]);
			});

			return result;
		}

		function get_host(){
            var host = $location.host();
            if (host.indexOf('.') < 0)
                return null;
            else
                return host.split('.')[0];
		}

		return service;
	}

})(angular);