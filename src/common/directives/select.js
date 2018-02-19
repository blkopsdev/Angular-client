(function () {
    'use strict';

    angular
        .module('caClient')
        .directive('select', select);

    select.$inject = [
        '$timeout'
    ];

    function select($timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
			$timeout(()=>{
                if (!$('html').hasClass('mobile')) {
                    element.dropdown({
                        onChange: function(val) {
                            $timeout(function () {
                                scope.ngModel = val;
                            })
                        }
                    });
                }
                var stop = scope.$watch(function () {
                    return scope.ngModel
                }, function (cur, prev) {
                    if (cur) {
                        setTimeout(function () {
                            element.dropdown('set selected', cur);
                        });
                    }
                })
            });
        }
    }

})();

