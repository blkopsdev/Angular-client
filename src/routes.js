(function () {
    'use strict';

    angular.module('caClient').config(router);

    router.$inject = ['$stateProvider', '$urlRouterProvider', 'CONST'];

    function router($stateProvider, $urlRouterProvider, CONST) {
        $urlRouterProvider.otherwise('/feed');

        $stateProvider
            .state('base', {
                url: '',
                templateUrl: CONST.getTemplateUrl('root/root.html'),
                abstract: true,
                controller: 'rootCtrl',
                controllerAs: 'vm'
            })
            .state('base.feed', {
                url: '/feed',
                params: {
                    message: ''
                },
                templateUrl: CONST.getTemplateUrl('feed/feed.html'),
                controller: 'feedCtrl',
                controllerAs: 'vm'
            })
    }

})();