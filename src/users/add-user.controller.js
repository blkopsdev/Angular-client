(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('addUserCtrl', addUserCtrl);

    function addUserCtrl(
        $rootScope
        ,$state
        ,gettext
        ,usersService
    ) {
        $rootScope.pageSubTitle = gettext('Add User');
        $rootScope.pageSubMenu = 'add-user'; // used to show submenu

        let vm = this;

        vm.title = 'addUserCtrl';
        vm.addingUser = false;
        vm.loading = 0;

        init();

        vm.addUser = function () {
            vm.addingUser = true;
            usersService.addUser(vm.newAddUserData).then(function (data) {
                $state.go('base.users', data);
            }).catch(function (response) {
                // if username error, move to create user
                $state.go('base.createUser', {username:vm.newAddUserData.username});

                //vm.addUserError = response.data.error.errors;
            }).finally(function () {
                vm.addingUser = false;
            });
        };

        vm.notInterested = function () {
            $state.go('base.users');
        };

        function init(){
            vm.newAddUserData = {};
			vm.newAddUserData.user_status = 1;
			vm.newAddUserData.user_type = 'client';
        }

    }

})();
