(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('feedCtrl', feedCtrl);

    feedCtrl.$inject = [
        '$rootScope'
        ,'$state'
        ,'$stateParams'
		,'gettext'
        ,'feedService'
        ,'adminService'
    ];

    function feedCtrl(
		$rootScope
        ,$state
        ,$stateParams
		,gettext
        ,dashboardService
	    ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Feed');
        $rootScope.pageSubMenu = 'Feed'; // used to show submenu

        var vm = this;
        vm.message = $stateParams.message;
        vm.title = 'feedCtrl';
        vm.loading = 0;


        activate();

        function activate(){
            vm.loading =0;
            console.log('feed control');
        }
    }

})();

