(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('feedCtrl', feedCtrl);

    feedCtrl.$inject = [
        '$rootScope'
        ,'$state'
        ,'$stateParams'
        ,'gettext'
        ,'feedService'
        ,'adminService'
    ];

    function feedCtrl(
        $rootScope
        ,$state
        ,$stateParams
        ,gettext
        ,feedService
        ,adminService
    ) {
        $rootScope.pageSubTitle = gettext('Feed');
        $rootScope.pageSubMenu = 'Feed'; // used to show submenu

        var vm = this;
        vm.message = $stateParams.message;
        vm.title = 'feedCtrl';
        vm.loading = 0;

        getFeed();

        function getFeed(){
            feedService.getFeed('3740b557-4be5-4f42-b548-1bd21e238de5').then(function(res) {
                debugger;
                vm.data = res;
            }, function(err) {
                vm.data = null;
            });
        }
    }
})();

