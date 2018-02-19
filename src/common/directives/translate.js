(function () {
    'use strict';

    angular
        .module('caClient')
        .directive('caTranslate', caTranslate);

    caTranslate.$inject = ['$rootScope','adminService'];

    function caTranslate($rootScope, adminService) {
        var directive = {
            link: link,
            restrict: 'A',
            transclude: true,
            scope: {
                key: '=caTranslate'
            },
            template:   '<ng-transclude></ng-transclude> ' +
                        '{{messages[key]}}'
        };

        return directive;

        function link(scope, element, attrs) {
			scope.messages = {};

			loadMessages(scope)();

			$rootScope.$on('language:change',loadMessages(scope));
        }

		function loadMessages(scope){
			return function(){
				adminService.getOptions([
					'/responses/error'
					,'/responses/success'
				]).then(function(data){
					angular.extend(scope.messages, data.error, data.success);
				});
			}
		}

    }

})();

