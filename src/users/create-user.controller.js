(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('createUserCtrl', createUserCtrl);

    function createUserCtrl(
        $rootScope
        ,$state
        ,$stateParams
        ,gettext
        ,usersService
        ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Create User');
        $rootScope.pageSubMenu = 'create-user'; // used to show submenu

        let vm = this;

        vm.title = 'createUserCtrl';
        vm.creatingUser = false;
        vm.loading = 0;

        init();

        vm.createUser = function () {
            vm.creatingUser = true;
            usersService.createUser(vm.newCreateUserData).then(function (data) {
                //link user
                console.log(vm.newCreateUserData);
                var relationData = {
                    "user_status": 1,
                    "user_type": "client",
                    "username": vm.newCreateUserData.email
                };
                console.log(relationData);
                usersService.createUserRelation(relationData).then(function (data) {
                    // user linked
                    $state.go('base.users',data);
                }).catch(function (response) {
                    vm.message = "User created but failed to add in this app.";
                }).finally(function () {

                });

            }).catch(function (response) {
                vm.createUserError = response.data.error.errors;
            }).finally(function () {
                vm.creatingUser = false;
            });
        };

        vm.notInterested = function () {
            $state.go('base.users');
        };

        function init(){
            //console.log($stateParams);
            console.log(adminService.userData);
            vm.newCreateUserData = {};
            vm.newCreateUserData.email = $stateParams.username;


			adminService.getOptions([
                    ,'/dropdowns/genders'
                    ,'/dropdowns/languages'
                    ,'/dropdowns/timezones'
                ]
                ,'en'
                ,true ).then(function(data){
                    vm.options = data;
            }).finally(function () {

            });




        }

    }

})();
