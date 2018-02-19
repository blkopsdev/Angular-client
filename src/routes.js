(function () {
    'use strict';

    angular.module('caClient').config(router);

    router.$inject = ['$stateProvider', '$urlRouterProvider', 'CONST'];

    function router($stateProvider, $urlRouterProvider, CONST) {
        // $urlRouterProvider.otherwise('/feed');

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
            .state('base.docs', {
                url: '/docs',
                params: {
                    message: ''
                },
                templateUrl: CONST.getTemplateUrl('docs/docs.html'),
                controller: 'docsCtrl',
                controllerAs: 'vm'
            })
            .state('base.events', {
                url: '/events',
                params: {
                    message: ''
                },
                templateUrl: CONST.getTemplateUrl('events/events.html'),
                controller: 'eventsCtrl',
                controllerAs: 'vm'
            })
    }

})();