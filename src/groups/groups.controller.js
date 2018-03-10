(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('groupsCtrl', groupsCtrl);

    groupsCtrl.$inject = [
        '$log'
        ,'$rootScope'
        ,'$q'
        ,'$anchorScroll'
        ,'gettext'
        ,'groupsService'
        ,'adminService'
    ];

    function groupsCtrl(
        $log
        ,$rootScope
        ,$q
        ,$anchorScroll
        ,gettext
        ,groupsService
        ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Groups');
        $rootScope.pageSubMenu = 'groups'; // used to show submenu


        var vm = this;
        vm.title = 'groupsCtrl';
        vm.loading = 0;


        activate();


        ////////////////////////
        function activate() {

            vm.loading += 1;
            groupsService.getGroups()
                .then(function (data) {
                    vm.groups = data;
                    if (typeof data.length === 'undefined') {
                        vm.empty = true;
                    }
                })
                .finally(function () {
                    vm.loading -= 1;
                });
        }

    }

})();