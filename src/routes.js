(function () {
    'use strict';

    angular.module('caClient').config(router);

    router.$inject = ['$stateProvider', '$urlRouterProvider', 'CONST'];

    function router($stateProvider, $urlRouterProvider, CONST) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('base', {
                url: '',
                abstract: true,
                controller: 'rootCtrl',
                templateUrl: CONST.getTemplateUrl('root/root.html'),
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
            .state('base.home', {
                url: '/dashboard?dashboard',
                loginRequired: true,
                params: {
                    message: ''
                },
                templateUrl: CONST.getTemplateUrl('dashboard/dashboard.html'),
                controller: 'dashboardCtrl',
                controllerAs: 'vm'
            })
            .state('base.createCase', {
                url: '/case/create',
                params: {
                    customCreateApp: false
                },
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('cases/create-case.html'),
                controller: 'createCaseCtrl',
                controllerAs: 'vm'
            })
            .state('base.cases', {
                url: '/cases',
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('cases/cases.html'),
                controller: 'casesCtrl',
                controllerAs: 'vm'
            })
            .state('base.editCase', {
                url: '/case/edit/:case_id',
                params: {
                    case_id: ''
                },
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('cases/edit-case.html'),
                controller: 'editCaseCtrl',
                controllerAs: 'vm'
            })
            .state('base.assignCase', {
                url: '/case/assign/:case_id',
                params: {
                    case_id: ''
                },
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('cases/assign-case.html'),
                controller: 'assignCaseCtrl',
                controllerAs: 'vm'
            })
            .state('base.users', {
                url: '/users',
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('users/users.html'),
                controller: 'usersCtrl',
                controllerAs: 'vm'
            })
            .state('base.addUser', {
                url: '/user/add',
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('users/add-user.html'),
                controller: 'addUserCtrl',
                controllerAs: 'vm'
            })
            .state('base.createUser', {
                url: '/user/create',
                params: {
                    username: null
                },
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('users/create-user.html'),
                controller: 'createUserCtrl',
                controllerAs: 'vm'
            })
            .state('base.editUser', {
                url: '/user/edit/:user_id',
                params: {
                    user_id: ''
                },
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('users/edit-user.html'),
                controller: 'editUserCtrl',
                controllerAs: 'vm'
            })
            .state('base.groups', {
                url: '/groups',
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('groups/groups.html'),
                controller: 'groupsCtrl',
                controllerAs: 'vm'
            })
            .state('base.createGroup', {
                url: '/group/create',
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('groups/create-group.html'),
                controller: 'createGroupCtrl',
                controllerAs: 'vm'
            })
            .state('base.editGroup', {
                url: '/group/edit/:group_id',
                params: {
                    group_id: ''
                },
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('groups/edit-group.html'),
                controller: 'editGroupCtrl',
                controllerAs: 'vm'
            })
            .state('base.moduleSetting', {
                url: '/setting/module',
                params: {
                    group_id: ''
                },
                loginRequired: true,
                templateUrl: CONST.getTemplateUrl('settings/module/module-settings.html'),
                controller: 'moduleSettingCtrl',
                controllerAs: 'vm'
            })
        ;
    }

})();