(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('usersCtrl', usersCtrl);

    usersCtrl.$inject = [
        '$log'
        ,'$rootScope'
		,'$q'
		,'$uibModal'
		,'$anchorScroll'
		,'gettext'
        ,'usersService'
        ,'adminService'
		,'utils'
    ];

	function usersCtrl(
		$log
		,$rootScope
		,$q
		,$uibModal
		,$anchorScroll
		,gettext
		,usersService
		,adminService
		,utils
	) {
		$rootScope.pageSubTitle = gettext('Users');
        $rootScope.pageSubMenu = 'users'; // used to show submenu


		var vm = this;
		vm.title = 'usersCtrl';
		vm.loading = 0;


		activate();


		vm.removeUser = function (user_id) {
			usersService.removeUserRelation(user_id).then(function (data) {

				// remove from list
                var index = vm.users.findIndex(function(user) {
                    return user.user_id == user_id
                });
                vm.users.splice(index, 1);

            }).catch(function(response){

			});
        }

		////////////////////////
        function activate() {
			vm.messages = {};
			vm.password = {};

			vm.loading += 1;
            usersService.fetchUsers()
				.then(function (data) {
					vm.users = data;
                    if (typeof data.length === 'undefined') {
                        vm.emptyUsers = true;
                    }
				})
				.finally(function () {
					vm.loading -= 1;
				});
		}

	}

})();