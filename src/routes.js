(function () {
    'use strict';

    angular.module('caClient').config(router);

    router.$inject = ['$stateProvider', '$urlRouterProvider', 'CONST'];

    function router($stateProvider, $urlRouterProvider, CONST) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('base', {
                url: '/',
                abstract: true,
                controller: 'rootCtrl',
                templateUrl: CONST.getTemplateUrl('root/root.html'),
                controllerAs: 'vm'
            })
            .state('base.home', {
                url: '/dashboard',
                loginRequired: true,
                params: {
                    message: ''
                },
                templateUrl: CONST.getTemplateUrl('dashboard/dashboard.html'),
                controller: 'dashboardCtrl',
                controllerAs: 'vm'
            });
    }

})();