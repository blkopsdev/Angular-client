(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('usersService', usersService);

    usersService.$inject = [
    	'$http'
		,'$log'
		,'$q'
		,'adminService'
		,'apiService'
	];

    /* @ngInject */
    function usersService(
    	$http
		,$log
		,$q
		,adminService
		,apiService
	) {
        var service = {
            addUser: addUser,
            fetchUsers: fetchUsers,
            createUser: createUser,
            createUserRelation : createUserRelation,
            updateUserRelation:updateUserRelation,
            getUserRelation: getUserRelation,
            removeUserRelation: removeUserRelation
        };
        return service;

        ////////////////

        function addUser(data) {
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/users/relations'),
                method: 'POST',
                data: data
            }).then(function (response) {
                return response.data;
            });
        }
        function createUser(data){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/users'),
                method: 'POST',
                data: data
            }).then(function (response) {
                return response.data;
            });
        }

        function updateUserRelation(user_id,data){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/users/relations/'+user_id),
                method: 'PUT',
                data: data
            }).then(function (response) {
                return response.data;
            });
        }

        function createUserRelation(data){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/users/relations'),
                method: 'POST',
                data: data
            }).then(function (response) {
                return response.data;
            });
        }

        function fetchUsers() {
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/users/relations'),
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }

        function getUserRelation(user_id){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/users/relations/'+user_id),
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }

        function removeUserRelation(user_id){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/users/relations/'+user_id),
                method: 'DELETE'
            }).then(function (response) {
                return response.data;
            });
        }

    }
})();

