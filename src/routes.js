(function () {
    'use strict';

    angular.module('caClient').config(router);

    router.$inject = ['$stateProvider', '$urlRouterProvider', 'CONST'];

    function router($stateProvider, $urlRouterProvider, CONST) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('base', {
                url: '',
                templateUrl: CONST.getTemplateUrl('root/root.html'),
                abstract: true,
                controller: 'rootCtrl',
                controllerAs: 'vm'
            })
            .state('base.login', {
                url: '/login',
                params: {
                    message: ''
                },
                templateUrl: CONST.getTemplateUrl('login/login.html'),
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
    }

})();