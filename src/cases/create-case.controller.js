(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('createCaseCtrl', createCaseCtrl);

    function createCaseCtrl(
        $rootScope
        ,$state
        ,gettext
        ,dashboardService
        ,casesService
        ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Create Case');
        $rootScope.pageSubMenu = 'create-case'; // used to show submenu

        let vm = this;

        vm.title = 'createCaseCtrl';
        vm.creatingCase = false;
        vm.loading = 0;

        init();

        vm.createCase = function () {
            vm.creatingCase = true;
            console.log(vm.newCaseData);
            casesService.createCase(vm.newCaseData).then(function (data) {
                $state.go('base.cases', data);
            }).catch(function (response) {
                vm.createCaseError = response.data.error.errors;
            }).finally(function () {
                vm.creatingCase = false;
            });
        };

        vm.notInterested = function () {
            $state.go('base.cases');
        };

        function init(){
            vm.newCaseData = {};
			//vm.newAppData.plan = 'FreeTrial';
        }

    }

})();
