(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('casesService', casesService);

    casesService.$inject = [
    	'$http'
		,'$log'
		,'$q'
		,'adminService'
		,'apiService'
	];

    /* @ngInject */
    function casesService(
    	$http
		,$log
		,$q
		,adminService
		,apiService
	) {
        var service = {
            createCase: createCase,
            fetchCases: fetchCases,
            getCase: getCase,
            updateCase:updateCase,
            getGroups:getGroups,
            assignedUsers:assignedUsers,
            updateCaseRelaiton:updateCaseRelaiton
        };
        return service;

        ////////////////

        function createCase(data) {
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/cases'),
                method: 'POST',
                data: data
            }).then(function (response) {
                return response.data;
            });
        }

        function fetchCases() {
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/cases'),
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }

        function getCase(case_id){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/cases/'+case_id),
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }

        function updateCase(case_id,data){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/cases/'+case_id),
                method: 'PUT',
                data: data
            }).then(function (response) {
                return response.data;
            });
        }

        function getGroups(){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/groups'),
                method: 'GET'
            }).then(function (response) {

                return response.data;

            });


        }
        function assignedUsers(case_id){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/cases/relations/'+case_id),
                method: 'GET'
            }).then(function (response) {

                return response.data;
            });
        }

        // update case assing with new user and remove if removed
        function updateCaseRelaiton(case_id, updatedUsers, removedUsers){
            var promise = [];
            updatedUsers.forEach(function(d) {
                promise.push($http({
                    authRequired: true,
                    url: apiService.getApiUrl('/cases/relations/'+case_id),
                    method: 'POST',
                    data: {user_id : d.user_id, group_id : d.group_id}
                }))
            });

            removedUsers.forEach(function(d) {
                promise.push($http({
                    authRequired: true,
                    url: apiService.getApiUrl('/cases/relations/'+case_id+'/'+d.user_id),
                    method: 'DELETE'
                }))
            });


            return $q.all(promise).then(function(results){
                results.forEach(function(data,status,headers,config){
                    console.log(data,status,headers,config);
                })
            }).catch(function(response){
                console.log('case update error');
            });

        }

    }
})();

