(function () {
	'use strict';

    angular.module('caClient').config(config);

    function config(
    	$compileProvider
		,$httpProvider
		,$logProvider
		,$cookiesProvider
		,$uiViewScrollProvider
		,ngIntlTelInputProvider
		,DEBUG
		,COOKIES_DOMAIN
	) {
		$compileProvider.debugInfoEnabled(!!DEBUG);
		$logProvider.debugEnabled(!!DEBUG);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);

        ngIntlTelInputProvider.set({
            autoPlaceholder: 'off',
            separateDialCode : false,
            nationalMode: false
        });

		const now = new Date()
			,inThreeMonth =  new Date(new Date().setMonth(now.getMonth()+3));

		$cookiesProvider.defaults.domain = COOKIES_DOMAIN;
		$cookiesProvider.defaults.expires = inThreeMonth; //expires in 3 month

		// scroll on top on state change
		$uiViewScrollProvider.useAnchorScroll();

        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$q', '$rootScope', 'CONST', function ($q, $rootScope, CONST) {
            return {
                response: responseHandler,
                responseError: responseErrorHandler
            };

			function responseHandler(response) {
				// todo return data
				// VERY IMPORTANT NOTICE: data.items is returned instead of payload
				// wasted much time on debugging this one
                // if multi entry response come with items wrap
				if(response){
					if(response.data && response.data.data && response.data.data.items){
                        response.data = response.data.data.items;
                    }
					else if(response.data && response.data.data){
						response.data = response.data.data;
					}
				}

				return response;
			}

			function responseErrorHandler(rejection) {
				console.error(rejection || 'Unknown Http Error');

				if(rejection){
					if(rejection.config){
						if (rejection.status === CONST.HTTP.STATUSES.UNAUTHORIZED) {
							$rootScope.$emit(CONST.EVENTS.UNAUTHORIZED);
						} else if (rejection.status === CONST.HTTP.STATUSES.ACCESS_DENIED) {
							$rootScope.$emit(CONST.EVENTS.FORBIDDEN)
						} else if(rejection.status >= 500
							|| rejection.status === CONST.HTTP.STATUSES.OFFLINE
							|| rejection.status === CONST.HTTP.STATUSES.CORS_ERROR) {
							$rootScope.$emit(CONST.EVENTS.UNKNOWN_ERROR)
						}
					}

					return $q.reject(rejection);
				}
			}

        }]);
	}

})();