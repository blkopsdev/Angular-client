(function(angular){
	'use strict';

	angular
		.module('caClient')
		.directive('caEqualTo',caEqualTo);

	caEqualTo.$inject = ['$log'];

	function caEqualTo($log){
		return {
			restrict: 'A'
			,require: 'ngModel'
			,scope: false
			,link: equalToLink
		};

		function equalToLink(scope,elem,attrs,ngModel){
			if(!ngModel){
				$log.warn('Equal to validation requires ngModel to be on the element');

				return;
			}
			ngModel.$validators.caEqualTo = validate;

			// Force-trigger the validation pipeline.
			attrs.$observe('caEqualTo',function(){
				ngModel.$validate();
			});

			function validate(value){
				if(!value && !attrs.caEqualTo){
					return true;
				}

				return attrs.caEqualTo === String(value);
			}
		}
	}

})(window.angular);
