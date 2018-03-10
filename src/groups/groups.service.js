(function () {
    'use strict';

    angular
        .module('caClient')
        .factory('groupsService', groupsService);

    groupsService.$inject = [
        '$http'
        ,'$log'
        ,'$q'
        ,'adminService'
        ,'apiService'
    ];

    /* @ngInject */
    function groupsService(
        $http
        ,$log
        ,$q
        ,adminService
        ,apiService
    ) {
        var service = {
            getGroup : getGroup,
            getGroups : getGroups,
            createGroup: createGroup,
            updateGroup: updateGroup,
            moduleData:moduleData,
        };
        return service;

        ////////////////

        function getGroup(group_id) {
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/groups/'+group_id),
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }

        function getGroups() {
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/groups'),
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }


        function createGroup(data){
            return $http({
                authRequired: true,
                url:  apiService.getApiUrl('/groups'),
                method: 'POST',
                data: data
            }).then(function (response) {
                return response.data;
            });
        }

        function updateGroup(group_id, data){
            return $http({
                authRequired: true,
                url: apiService.getApiUrl('/groups/'+group_id),
                method: 'PUT',
                data:data
            }).then(function (response){
                return response.data;
            })
        }

        function moduleData(){

                    return $q.all({
                        options: adminService.getOptions([
                                '/modules/all'
                                ,'/modules/names'
                            ]
                            ,'en'
                            ,false // return dicts as arrays
                        )
                    })
                        .then(function(data){
                            return data;
                        });

        }


    }
})();

