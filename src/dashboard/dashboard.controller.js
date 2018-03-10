(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = [
        '$rootScope'
        ,'$state'
        ,'$stateParams'
		,'gettext'
        ,'dashboardService'
        ,'adminService'
    ];

    function dashboardCtrl(
		$rootScope
        ,$state
        ,$stateParams
		,gettext
        ,dashboardService
	    ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Dashboard');
        $rootScope.pageSubMenu = 'dashboard'; // used to show submenu

        var vm = this;
        vm.message = $stateParams.message;
        vm.title = 'dashboardCtrl';
        vm.loading = 0;


        activate();

        function activate(){
            vm.loading =0;
            console.log('dashboard control');
        }
    }

})();

