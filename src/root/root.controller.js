(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('rootCtrl', rootCtrl);

    rootCtrl.$inject = [
        '$timeout'
        ,'$rootScope'
        ,'$state'
        ,'$log'
		,'$sce'
        ,'gettextCatalog'
        ,'TERMS_OF_USE_URL'
        ,'CONST'
        ,'adminService'
        ,'apiService'
    ];

    function rootCtrl(
		$timeout
        ,$rootScope
        ,$state
        ,$log
		,$sce
        ,gettextCatalog
        ,TERMS_OF_USE_URL
        ,CONST
        ,adminService
        ,apiService
    ) {
        var vm = this;
        vm.title = 'rootCtrl';
        $rootScope.TERMS_OF_USE_URL = TERMS_OF_USE_URL;
        $rootScope.currentYear = new Date().getFullYear();
		$rootScope.adminService = adminService;
        $rootScope.getCdnImageUrl = getCdnImageUrl;

        vm.logout = function () {
            adminService.logout().then(function () {
                $rootScope.pageSubTitle = '';
                $state.go('base.login');
            });
        };


		function getCdnImageUrl(file,ext,width){
			var url = apiService.getDynamicCdnUrl('/image?image=assets/'+file+'&ext='+ext+'&height=0&width='+width+'&bucket=aux');
			// trust this url so angular can interpolate it in html
			return $sce.trustAsResourceUrl(url);
		}

		$log.log('App Version', CONST.APP_VERSION);
    }

})();

