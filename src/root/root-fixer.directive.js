(function () {
    'use strict';

    angular
        .module('caClient')
        .directive('rootFixer', rootFixer);

    rootFixer.$inject = [
        '$rootScope',
        '$state'
    ];

    function rootFixer ($rootScope, $state) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link (scope, element, attrs) {
            var toggle = function (toState) {
                if (toState.loginRequired) {
                    $('html').removeClass('e').addClass('b');
                }
                else {
                    $('html').removeClass('b').addClass('e');
                }
            };
            $rootScope.$watch(function () {
                return $state.$current.name
            }, function () {
                $('body').scrollTop(0);
                toggle($state.$current);
            });
            toggle($state.current)
        }
    }

})();

