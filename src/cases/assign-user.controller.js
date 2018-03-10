(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('assignCaseCtrl', assignCaseCtrl);

    function assignCaseCtrl(
        $rootScope
        ,$state
        ,gettext
        ,dashboardService
        ,casesService
        ,adminService
        ,usersService
        ,$http
        ,$stateParams
        ,$q
    ) {
        $rootScope.pageSubTitle = gettext('Assign User');
        $rootScope.pageSubMenu = 'assign-case'; // used to show submenu

        let vm = this;

        vm.title = 'createCaseCtrl';
        vm.creatingCase = false;
        vm.loading = 0;
        vm.assigned = [];
        vm.oldAssigned = [];
        vm.groups = {};
        vm.users = [];

        init();

        // save users to that case

        vm.save = function () {
            vm.saving = true;

            var removedUsers = vm.oldAssigned.filter(function(o1){
                return !vm.assigned.some(function(o2){
                    return o1.user_id === o2.user_id;          // assumes unique id
                });
            });
            //console.log(vm.assigned);
            //console.log(vm.oldAssigned);
            //console.log(removedUsers);

            casesService.updateCaseRelaiton($stateParams.case_id,vm.assigned, removedUsers).then(function (data) {
                $state.go('base.cases');

            }).catch(function (response) {
                //vm.message = 'error';

            }).finally(function () {
                vm.saving = false;
            });
        };

        vm.notInterested = function () {
                $state.go('base.cases');
        };

        // callback, when on select user to assign
        vm.onSelect = function ($item, $model, $label) {

            console.log($item);
            console.log($model);
            console.log($label);
            vm.assigned.push({
                    "given_name": $item.given_name,
                    "family_name": $item.family_name,
                    "user_id": $item.user_id,
                    "group_id": $model
            });

            var index = vm.users.indexOf($item);
            vm.users.splice(index, 1);

            vm.selected[$model] = '';

        };

        // remove from assigned and add it to user list
        vm.deleteUser = function(user_id) {

            var index = vm.assigned.findIndex(function(person) {
                return person.user_id == user_id
            });
            vm.users.push({
                    "user_id": vm.assigned[index].user_id,
                    "given_name": vm.assigned[index].given_name,
                    "family_name": vm.assigned[index].family_name
            });
            vm.assigned.splice(index, 1);
        }

        // get group, users and existing relations

        function init(){
            vm.actionCaseId = $stateParams.case_id;

            vm.ngModelOptionsSelected = function(value) {
                if (arguments.length) {
                    _selected = value;
                } else {
                    return _selected;
                }
            };

            vm.modelOptions = {
                debounce: {
                    default: 500,
                    blur: 250
                },
                getterSetter: true
            };

            vm.loading = true;

            casesService.getGroups().then(function (data) {
                vm.groups = data;
                //console.log(data);
            }).catch(function(response){

            }).finally(function(){
                vm.loading = false;
            });

            casesService.assignedUsers($stateParams.case_id).then(function (data) {
                vm.assigned = data.map(function(item,index){
                    return {
                        given_name : item.given_name,
                        family_name : item.family_name,
                        user_id : item.user_id,
                        group_id : item.group_id
                    };
                });
                vm.oldAssigned = angular.copy(vm.assigned);

                //console.log(vm.assigned);

                // get users

                usersService.fetchUsers().then(function(data){

                    vm.users = [];
                    angular.forEach(data, function(value, key){

                        var index = vm.assigned.findIndex(function(person) {
                            return person.user_id == value.user_id
                        });
                        if(index==-1) {
                            vm.users.push(value);
                        }
                    });

                }).catch(function(response){

                });

                console.log(data);
            }).catch(function(response){

            }).finally(function(){
                vm.loading = false;
            });



        }



    }

})();
