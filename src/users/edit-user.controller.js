(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('editUserCtrl', editUserCtrl);

    function editUserCtrl(
        $rootScope
        ,$state
        ,$stateParams
        ,gettext
        ,usersService
        ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Edit User');
        $rootScope.pageSubMenu = 'edit-user'; // used to show submenu

        let vm = this;

        vm.title = 'editUserCtrl';
        vm.saving = false;
        vm.loading = 0;

        init();

        vm.save = function () {
            vm.saving = true;
            usersService.updateUserRelation($stateParams.user_id, vm.editData).then(function (data) {
                $state.go('base.users',data);
            }).catch(function (response) {
                vm.saveError = response.data.error.errors;
            }).finally(function () {
                vm.saving = false;
            });
        };

        vm.notInterested = function () {
                $state.go('base.users');
        };

        function init(){
            vm.loading = true;
            vm.editData = {};

            usersService.getUserRelation($stateParams.user_id).then(function (data) {
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
