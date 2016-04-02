'use strict';

// Declare app level module which depends on filters, and services
angular.module('checklist.config', [])

    // your Firebase data URL goes here, no trailing slash
    .constant('FBURL', 'https://<app-name>.firebaseio.com')

    // double check that the app has been configured before running it and blowing up space and time
    .run(['FBURL', '$timeout', function (FBURL, $timeout) {
        if (FBURL.match('//INSTANCE.firebaseio.com')) {
            angular.element(document.body).html('<h1>Please configure app/config.js before running!</h1>');
            $timeout(function () {
                angular.element(document.body).removeClass('hide');
            }, 250);
        }
    }]);