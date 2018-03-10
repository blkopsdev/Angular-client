(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('createGroupCtrl', createGroupCtrl);

    function createGroupCtrl(
        $rootScope
        ,$state
        ,gettext
        ,dashboardService
        ,groupsService
        ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Create Group');
        $rootScope.pageSubMenu = 'create-group'; // used to show submenu

        let vm = this;

        vm.title = 'createGroupCtrl';
        vm.creating = false;
        vm.loading = 0;

        init();

        vm.create = function () {
            vm.creating = true;
            //console.log(vm.newData);

            var perms = {};
            angular.forEach(vm.permissons, function(value, key) {
                //console.log(key + ' ' + value);
                var temp = [];
                angular.forEach(value, function(v,k){
                   //console.log(k + ' ' +v);
                   if(v==true){
                       temp.push(k);
                   }
                });
                if(temp.length){
                    perms[key] = temp;
                }
            });
            //console.log(perms);
            if(!angular.equals(perms, {})){
                vm.newData.permission = perms;
            }

            //console.log(vm.newData);

            //vm.creating = false;

            groupsService.createGroup(vm.newData).then(function (data) {
                $state.go('base.groups', data);
            }).catch(function (response) {
                vm.createError = response.data.error.errors;
            }).finally(function () {
                vm.creating = false;
            });
        };

        vm.notInterested = function () {
            $state.go('base.groups');
        };

        function init(){
            vm.loading = true;
            vm.newData = {};
            vm.modules = {};
            vm.permissons = {};


            groupsService.moduleData().then(function (data) {
                    //console.log(data);
                    vm.module_options = data.options.all;
                    vm.module_names = data.options.names;

                    //console.log(vm.module_names);
                    //console.log(vm.module_options);
                })
                .finally(function () {
                    vm.loading = false;
                });
        }

    }

})();
