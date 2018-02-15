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

        vm.openApp = function (app) {
            dashboardService.fetchAppUrl(app.host_id).then(function (data) {
                console.log(data);
                location.href = data.app_url
            }).catch(function (response) {
                vm.notFoundApp = response.data.error.errors;
            });
        };

        function loadApps(){
			if ($stateParams.app) {
				vm.openApp({host_id: $stateParams.app});
				return;
			}

			vm.loading += 1;
            dashboardService.fetchApps().then(function (data) {
				vm.apps = data;
				if (typeof data.length === 'undefined') {
					vm.emptyApps = true;
				}
				return vm.apps;
			}).catch(function (e) {
				console.log(e);
				if (e.status === 404) { // that means you have no apps
					vm.emptyApps = true;
				}
			}).finally(() => vm.loading -= 1);
		}

        activate();

        function activate(){
			vm.loading += 1;
			adminService.getProfile()
                .then(function(profile){
                    if(profile.create_app) {
                        $state.go('base.createApp', {customCreateApp: true});
                        return;
                    } else {
					    loadApps();
                    }
				})
				.finally(() => vm.loading -= 1);
        }
    }

})();

