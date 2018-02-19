(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('eventsCtrl', eventsCtrl);

    eventsCtrl.$inject = [
        '$rootScope'
        ,'$state'
        ,'$stateParams'
		,'gettext'
        ,'eventsService'
        ,'adminService'
    ];

    function eventsCtrl(
		$rootScope
        ,$state
        ,$stateParams
		,gettext
        ,eventsService
	    ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Events');
        $rootScope.pageSubMenu = 'Events'; // used to show submenu

        var vm = this;
        vm.message = $stateParams.message;
        vm.title = 'eventsCtrl';
        vm.loading = 0;

        activate();

        function activate(){
            vm.loading =0;
            console.log('events control');
        }
    }

})();

