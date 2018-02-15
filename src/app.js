(function () {
    'use strict';

    angular
        .module('caClient', [
            'ngCookies',
            'ui.router',
            'ui.router.state.events',
            'ui.bootstrap',
            'gettext',
            'vcRecaptcha',
            'ngIntlTelInput',
            'caClient.appConfig'
        ]);

})();