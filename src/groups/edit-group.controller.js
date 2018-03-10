(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('editGroupCtrl', editGroupCtrl);

    function editGroupCtrl(
        $rootScope
        ,$state
        ,$stateParams
        ,gettext
        ,groupsService
        ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Edit Group');
        $rootScope.pageSubMenu = 'edit-group'; // used to show submenu

        let vm = this;

        vm.title = 'editGroupCtrl';
        vm.saving = false;
        vm.loading = 0;
        vm.editData = {};

        init();

        vm.save = function () {
            vm.saving = true;
            console.log(vm.editData);

            var perms = {};
            angular.forEach(vm.permissions, function(value, key) {
                console.log(key + ' ' + value);
                var temp = [];
                angular.forEach(value, function(v,k){
                    console.log(k + ' ' +v);
                    if(v==true){
                        temp.push(k);
                    }
                });
                if(temp.length){
                    perms[key] = temp;
                }
            });
            console.log(perms);
            if(!angular.equals(perms, {})){
                vm.editData.permission = perms;
            }


            groupsService.updateGroup($stateParams.group_id,vm.editData).then(function (data) {
                $state.go('base.groups', data);
            }).catch(function (response) {
                vm.saveError = response.data.error.errors;
            }).finally(function () {
                vm.saving = false;
            });
        };

        vm.notInterested = function () {
            $state.go('base.groups');
        };


        function init(){
            vm.loading = true;

            vm.modules = {};
            vm.permissions = {};

            groupsService.getGroup($stateParams.group_id).then(function (data) {
                vm.editData = data;

                angular.forEach(data.permission,function(value,key){
                    var temp = {};
                    angular.forEach(value, function(vv,kk){
                        temp[vv] = true;
                    });
                    console.log(temp);
                    vm.permissions[key] = temp;
                });
                //vm.permissions = {myteam:{read:true}};

                groupsService.moduleData().then(function (data) {

                    vm.module_options = data.options.all;
                    vm.module_names = data.options.names;

                }).finally(function () {
                        vm.loading = false;
                    });
            }).catch(function (response) {
                vm.message= "Error";
                vm.notFound = true;
            }).finally(function () {
                vm.loading = false
            });





        }

    }

})();
