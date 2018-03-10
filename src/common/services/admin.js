(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('adminService', adminService);

    adminService.$inject = [
        '$q'
		,'$log'
		,'$http'
		,'$cookies'
		,'$rootScope'
		,'gettextCatalog'
		,'apiService'
    ];

    function adminService(
        $q
		,$log
        ,$http
		,$cookies
		,$rootScope
		,gettextCatalog
        ,apiService
    ) {
		var service = {
			userData: {},
			getAvatarUrl: getAvatarUrl,
			setLanguage: setLanguage,
			isLoggedIn: isLoggedIn,
			login: login,
			logout: logout,
			fetchProfile: fetchProfile,
			getProfile: getProfile,
			getOptions: getOptions,
			changePassword: changePassword,
			resetPassword: resetPassword,
			confirmResetPassword: confirmResetPassword,
			updateProfile: updateProfile,
			clearUserData: clearUserData,

			updateModules:updateModules
		};

        function getAvatarUrl(size) {
            if (service.userData.avatars) {
                return service.userData.avatars[size];
            }
        }

        function getProfile(){
        	console.log('getprofile');
			return $q.all({
					profile: fetchProfile().then(apiService.getData)
				})
				.then(function(data){
					updateProfile(data.profile);
					setLanguage(data.profile.locale);

					return data.profile;
				});
		}

        function updateProfile(data) {
			clearUserData();
            angular.extend(service.userData, data);
        }

        // return promise for already pending request instead of making a new one
		var cachedProfilePromise;
		function fetchProfile(){
			if(!cachedProfilePromise){
				cachedProfilePromise = $http({
					authRequired: true,
					url:  apiService.getApiUrl('/host'),
					method: 'GET'
				})
				.finally(function(){
					cachedProfilePromise = null;
				});
			}
			console.log(cachedProfilePromise);

			return cachedProfilePromise;
		}

		function fetchOptions(path,locale){
			locale = locale || service.userData.locale || $cookies.get('locale') ||  'en';

			return $http({
				method: "GET"
				,url: apiService.getOptionsUrl(path,locale)
				,cache: true
			});
		}

		function toArray(obj){
			return Object.keys(obj).map(function(key){
				return {key: key, value: obj[key]};
			});
		}

        function getOptions(list,locale,asArray){
			var ALL_OPTIONS = [
				'/dropdowns/countries'
				,'/dropdowns/genders'
				,'/dropdowns/timezones'
				,'/dropdowns/languages'
			]
			,promises = {};

			list = list || ALL_OPTIONS;

			list.forEach(function(option){
				var key = option.split('/').pop();

				promises[key] = fetchOptions(option,locale)
					.then(apiService.getData)
					// converting options to arrays to later sort with orderBy filter
					.then(asArray? toArray: angular.identity);
			});

			return $q.all(promises)
				.catch(function(response){
					// log failed response and pass the rejection further
					$log.error(response);
					return $q.reject(response);
				});
		}

        function clearUserData() {
            for (var prop in service.userData) {
                if (service.userData.hasOwnProperty(prop)) {
                    delete service.userData[prop];
                }
            }
        }

        function login(username, password) {
            return $http({
				method: 'POST',
				url:  apiService.getApiUrl('/session'),
                data: {username: username, password: password}
            });
        }

        function setLanguage(locale){
			if(!locale){
				locale = $cookies.get('locale') || 'en';
			} else {
				$cookies.put('locale', locale);
			}

			gettextCatalog.loadRemote(apiService.getOptionsUrl('/translations',locale))
				.then(function(){
					gettextCatalog.setCurrentLanguage(locale);
				});

			$rootScope.$emit('language:change');
		}

        function logout() {
            return $http({
                url:  apiService.getApiUrl('/session'),
                method: 'DELETE',
                authRequired: true
            }).then(function () {
                clearUserData();
            });
        }

        function changePassword(data) {
            return $http({
                url:  apiService.getApiUrl('/self/password'),
                method: 'PUT',
                data: data,
                authRequired: true
            }).then(function (response) {
                return response.data;
            })
        }

        function resetPassword(username) {
            return $http({
                url:  apiService.getApiUrl('/recovery'),
                method: 'POST',
                data: {username: username}
            }).then(apiService.getData)
        }

        function confirmResetPassword(data) {
            return $http({
                url:  apiService.getApiUrl('/recovery'),
                method: 'PUT',
                data: data
            }).then(apiService.getData)
        }

        function isLoggedIn() {
            return !angular.equals(service.userData,{});
        }



        function updateModules(data){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/host'),
                method: 'PUT',
                data: data
            }).then(function(response){
            	return response.data;
			})
		}

		return service;
    }

})();

