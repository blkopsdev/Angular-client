(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('editCaseCtrl', editCaseCtrl);

    function editCaseCtrl(
        $rootScope
        ,$state
        ,$stateParams
        ,gettext
        ,casesService
    ) {
        $rootScope.pageSubTitle = gettext('Edit Case');
        $rootScope.pageSubMenu = 'edit-case'; // used to show submenu

        let vm = this;

        vm.title = 'editCaseCtrl';
        vm.saving = false;
        vm.loading = 0;

        init();

        vm.save = function () {
            vm.saving = true;
            console.log(vm.newCaseData);
            casesService.updateCase($stateParams.case_id,vm.editData).then(function (data) {
                $state.go('base.cases', data);
            }).catch(function (response) {
                vm.saveError = response.data.error.errors;
            }).finally(function () {
                vm.saving = false;
            });
        };

        vm.notInterested = function () {
           $state.go('base.cases');
        };

        function init(){
            vm.loading = true;
            vm.editData = {};
            casesService.getCase($stateParams.case_id).then(function (data) {
                vm.editData = data;
            }).catch(function (response) {
                vm.message= "Error";
                vm.notFound = true;
            }).finally(function () {
                vm.loading = false
            });
        }

    }

})();
