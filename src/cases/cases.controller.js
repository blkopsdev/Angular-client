(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('casesCtrl', casesCtrl);

    casesCtrl.$inject = [
        '$log'
        ,'$rootScope'
		,'$q'
		,'$uibModal'
		,'$anchorScroll'
		,'gettext'
        ,'casesService'
        ,'adminService'
		,'utils'
    ];

	function casesCtrl(
		$log
		,$rootScope
		,$q
		,$uibModal
		,$anchorScroll
		,gettext
		,casesService
		,adminService
		,utils
	) {
		$rootScope.pageSubTitle = gettext('Cases');
        $rootScope.pageSubMenu = 'cases'; // used to show submenu

		var ACCOUNT_PROPERTIES = [
			'email_reset','email','referral','updated_on','email_verified','account_reset'
			,'phone_verified','phone_reset','user_id','created_on','avatars','phone'
		];

		var vm = this;
		vm.title = 'casesCtrl';
		vm.loading = 0;


		activate();

		////////////////////////
        function activate() {
			vm.messages = {};
			vm.password = {};

			vm.loading += 1;
			casesService.fetchCases()
				.then(function (data) {
					vm.cases = data;
                    if (typeof data.length === 'undefined') {
                        vm.emptyCases = true;
                    }
				})
				.finally(function () {
					vm.loading -= 1;
				});
		}

	}

})();