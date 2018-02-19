(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = [
        '$log'
		,'$rootScope'
		,'$q'
		,'$anchorScroll'
		,'$timeout'
		,'gettext'
		,'casesService'
		,'utils'
    ];

    /* @ngInject */
    function profileCtrl(
		$log
        ,$rootScope
        ,$q
        ,$anchorScroll
		,$timeout
		,gettext
        ,casesService
		,utils
    ) {
		$rootScope.pageSubTitle = gettext('Profile Settings');
		$anchorScroll.yOffset = 50;

		var PROFILE_PROPERTIES = [
			"zoneinfo", "locale", "given_name", "family_name", "country", "gender","postal_code"
			,"birthdate", "company", "locality", "region", "address1", "address2", "title"
		]; // is used to check if something was changed

        var vm = this;
        vm.title = 'profileCtrl';
        vm.updating = 0;
        vm.loading = false;


		vm.langSuffix = langSuffix;
        vm.saveProfile = saveProfile;
        vm.resetForm = resetForm;

		activate();

		//////////////////////////

		function saveProfile() {
			// todo send only what is changed, not whole self model
			$q.all({
					profile: saveData(vm.profile,vm.originalProfile)
				})
				.then(function (response){
					delete vm.savingError;
					vm.messages = {
						profile: response.profile && response.profile.message
						,email: response.email && response.email.message
						,phone: response.phone && response.phone.message
					};
					$anchorScroll('profileMessage');
				})
				.then(reloadData)
				.catch(function (response) {
					$log.error(response);
					vm.messages = {};
					vm.savingError = response.data.error.errors;
				});
		}

		function resetForm() {
			vm.profile = angular.copy(vm.originalProfile);
		}

		function saveData(data,originalData){
			var promise = $q.when();

			// check if profile part is changed
			data = utils.pick(data,PROFILE_PROPERTIES);
			originalData  = utils.pick(originalData,PROFILE_PROPERTIES);

			if(!angular.equals(data,originalData)){
				promise = casesService.saveAccount(data);
			}

			vm.updating += 1;
			return promise.finally(function (){
				vm.updating -= 1;
			});
		}

        function reloadData(){
			return casesService.getProfileData(true) //using force flag here
				.then(function(data){
					vm.options = data.options;

					// you need this timeout because
					// gettextCatalog.setCurrentLanguage triggers asynchronously
					// update via element's ng-model
					$timeout(function(){
						initProfile(vm, data.profile);
					});
				});
		}

        function initProfile(model,profile){
			model.originalProfile = profile;
			model.profile = angular.copy(profile);
        }

		function langSuffix(item){
			if(vm.originalProfile && vm.originalProfile.locale === 'en'){
				return '';
			}

			if(vm.langDict && vm.langDict[item.key]){
				return ' - '+ vm.langDict[item.key];
			}
		}

        function activate(force) {
            vm.loading = true;

            casesService.getProfileData(force)
                .then(function (data) {
                    vm.options = data.options;
					vm.langDict = data.enOptions.languages;

                    initProfile(vm, data.profile);
                })
                .finally(function () {
                    vm.loading = false;
                });
        }
    }

})();

