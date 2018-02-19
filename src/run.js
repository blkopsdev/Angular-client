(function () {
	'use strict';

    angular.module('caClient').run(run);

    run.$inject = [
    	'$state'
		,'$rootScope'
		,'$anchorScroll'
		,'$log'
		,'$timeout'
		,'CONST'
		,'ACCOUNT_CLIENT_URL'
		,'DEBUG'
		,'adminService'
		,'utils'
		,'gettextCatalog'
		,'$window'
	];

    // adminService should be here in any case because in should initialize user in rootscope
    function run(
    	$state
		,$rootScope
		,$anchorScroll
		,$log
		,$timeout
		,CONST
		,ACCOUNT_CLIENT_URL
        ,DEBUG
		,adminService
		,utils
		,gettextCatalog
		,$window
	) {
		adminService.setLanguage();
        gettextCatalog.debug = DEBUG;

        //$log.info(utils.get_host());

		//console.log(CONST);

		$rootScope.$on(CONST.EVENTS.UNKNOWN_ERROR, function() {
			$rootScope.systemErrorException = 'SystemErrorException';
			$anchorScroll('systemErrorException');

			$timeout(function(){
				$rootScope.systemErrorException = null;
			}, 6000);
		});

        $rootScope.$on(CONST.EVENTS.UNAUTHORIZED, function () {
        	if(adminService.isLoggedIn()){
				adminService.clearUserData();
			}
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            $log.debug(toState.name, toState.loginRequired);

            if(toState.loginRequired && !adminService.isLoggedIn()){
                // stop state transition until we make sure that user is logged in
                $log.info('not logged');
				event.preventDefault();
				adminService.getProfile()
                    .then(function(){
						$state.go(toState, toParams);
                    })
					.catch(function(){
						$log.info('Cannot get self. Transition prevented. Redirect to account page');
						// $state.go('base.feed');
						$window.location.href = ACCOUNT_CLIENT_URL;
					});
			}
			else{
            	$log.info('logged');
			}
        });
    }
})();