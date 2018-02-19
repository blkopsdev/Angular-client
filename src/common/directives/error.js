(function () {
    'use strict';

    angular
        .module('caClient')
        .directive('caError', caError);

    caError.$inject = [
        '$log'
        ,'$rootScope'
        ,'adminService'
    ];

    function caError(
        $log
        ,$rootScope
        ,adminService
    ) {
        var directive = {
            link: link,
            restrict: 'A',
            transclude: true,
            scope: {
                location: '@',
                errors: '=caError',
                showEmpty: '='
            },
            template: '<p ng-if="showEmpty && (!errors || (errors | filter:{location: location}).length == 0)" class="notice-empty"></p> ' +
            '<p ng-if="errors.length > 0" ' +
                'class="notice-a initial-font-size" ' +
                'ng-repeat="error in errors | filter:{location: location} track by $index">' +
                '<ng-transclude></ng-transclude>' +
                ' {{ messages[error.message]}} ' +
            '</p>'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.messages = {};

			loadMessages(scope)();
			$rootScope.$on('language:change',loadMessages(scope));
			scope.$watch('errors', checkIfNotArray(element));
        }

        function loadMessages(scope){
            return function(){
                adminService.getOptions([
                    '/responses/error'
                ]).then(function(data){
                    angular.extend(scope.messages, data.error);
                });
            }
        }

		function checkIfNotArray(element){
            return function(value,oldValue,scope){
                if(!value){
                    // do not check
                    return;
                }

                if(!angular.isArray(value)){
					$log.warn('[caError] directive expected an array of errors, got: ', typeof value, value, 'on element ', element[0]);
                    scope.errors = [];
                }
			}
        }
    }

})();

