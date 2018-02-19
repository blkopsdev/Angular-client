(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('docsCtrl', docsCtrl);

    docsCtrl.$inject = [
        '$rootScope'
        ,'$state'
        ,'$stateParams'
		,'gettext'
        ,'docsService'
        ,'adminService'
    ];

    function docsCtrl(
		$rootScope
        ,$state
        ,$stateParams
		,gettext
        ,docsService
	    ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Docs');
        $rootScope.pageSubMenu = 'Docs'; // used to show submenu

        var vm = this;
        vm.message = $stateParams.message;
        vm.title = 'docsCtrl';
        vm.loading = 0;

        activate();

        function activate(){
            vm.loading =0;
            console.log('docs control');
        }
    }

})();

