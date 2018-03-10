(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('moduleSettingCtrl', moduleSettingCtrl);

    moduleSettingCtrl.$inject = [
        '$log'
        ,'$rootScope'
		,'$q'
		,'$uibModal'
		,'$anchorScroll'
		,'gettext'
        ,'usersService'
        ,'adminService'
		,'groupsService'
		,'utils'
    ];

	function moduleSettingCtrl(
		$log
		,$rootScope
		,$q
		,$uibModal
		,$anchorScroll
		,gettext
		,usersService
		,adminService
		,groupsService
		,utils
	) {
		$rootScope.pageSubTitle = gettext('Modules');
        $rootScope.pageSubMenu = 'modules'; // used to show submenu


		var vm = this;
		vm.title = 'moduleSettingCtrl';
		vm.loading = true;
		vm.message = false;


		activate();


		vm.save = function(){
            vm.saving = true;

            var moduleData = [];
            angular.forEach(vm.formData, function(value, key) {

                    if(value==true){
                        moduleData.push(key);
                    }
                });
            console.log(moduleData);
            var submitData = {};
            submitData.modules = moduleData;
            console.log(submitData);


            adminService.updateModules(submitData).then(function (data) {
				vm.message = true;
            }).catch(function (response) {
            	console.log(response);
                vm.formError = response.data.error.errors;
            }).finally(function () {
                vm.saving = false;
            });
		};

		vm.isModuleAactive = function(m){
            if(adminService.userData.modules.indexOf(m) !== -1) {
                return true;
            }
            esle
				return false;
		}

		////////////////////////
        function activate() {

        	console.log(adminService.userData);

        	vm.formData = {};
        	angular.forEach(adminService.userData.modules,function(value,key){
        		vm.formData[value] = true;
			});

        	console.log(vm.formData);

            groupsService.moduleData().then(function (data) {
                //console.log(data);
                //vm.module_options = data.options.all;
                vm.modules = data.options.names;

                //console.log(vm.module_names);
                //console.log(vm.module_options);
            })
                .finally(function () {
                    vm.loading = false;
                });
		}

	}

})();