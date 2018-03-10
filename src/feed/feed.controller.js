(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('feedCtrl', feedCtrl);

    feedCtrl.$inject = [
        '$rootScope'
        ,'$stateParams'
        ,'gettext'
        ,'caseService'
        ,'feedService'
    ];

    function feedCtrl(
        $rootScope
        ,$stateParams
        ,gettext
        ,caseService
        ,feedService
    ) {
        $rootScope.pageSubTitle = gettext('Feed');
        $rootScope.pageSubMenu = 'Feed'; // used to show submenu

        var vm = this;
        vm.message = $stateParams.message;
        vm.title = 'feedCtrl';
        vm.loading = 0;

        getFeed();

        function getFeed(){
            caseService.getCases().then(function (res) {
                debugger;
                var cases = res.data;
                for (var i = 0; i < cases.length; i++) {
                    var caseId = cases[i].case_id;
                    feedService.getFeed(caseId).then(function(res) {
                        vm.data = res;
                    }, function(err) {
                        vm.data = null;
                    });
                }
            });

        }
    }
})();

