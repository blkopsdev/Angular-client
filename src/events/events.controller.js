(function () {
    'use strict';

    angular
        .module('caClient')
        .controller('eventsCtrl', eventsCtrl);

    eventsCtrl.$inject = [
        '$rootScope'
        ,'$stateParams'
        ,'gettext'
        ,'caseService'
        ,'eventsService'
    ];

    function eventsCtrl(
        $rootScope
        ,$stateParams
        ,gettext
        ,caseService
        ,eventsService
    ) {
        $rootScope.pageSubTitle = gettext('Feed');
        $rootScope.pageSubMenu = 'Feed'; // used to show submenu

        var vm = this;
        vm.message = $stateParams.message;
        vm.title = 'eventsCtrl';
        vm.loading = 0;

        getFeed();

        function getFeed(){
            caseService.getCases().then(function (res) {
                debugger;
                var cases = res.data;
                for (var i = 0; i < cases.length; i++) {
                    var caseId = cases[i].case_id;
                    eventsService.getFeed(caseId).then(function(res) {
                        vm.data = res;
                    }, function(err) {
                        vm.data = null;
                    });
                }
            });

        }
    }
})();

