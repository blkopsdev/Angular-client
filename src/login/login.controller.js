(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', 'adminService', '$state', '$rootScope', '$stateParams'];

    function loginCtrl($scope, adminService, $state, $rootScope, $stateParams) {
        var vm = this;
        vm.loading = false;
        vm.message = $stateParams.message;
        vm.signInError = null;
        vm.title = 'loginCtrl';
        vm.user = {
            username: '',
            password: ''
        };
        if (adminService.isLoggedIn()) {
            $state.go('base.home');
        }

        vm.login = function () {
            vm.loading = true;
            adminService.login(vm.user.username, vm.user.password)
                .then(function () {
                    $state.go('base.home');
                })
            .catch(function (response) {
                console.warn('login failed', response);

                if(response && response.data && response.data.error){
					vm.signInError = response.data.error.errors;
				}
            })
            .finally(function () {
                vm.loading = false;
            });
        };
    }

})();

