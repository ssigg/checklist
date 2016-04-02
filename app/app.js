'use strict';

angular.module('checklist', [
        'checklist.create',
        'checklist.use'])

    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/create'
        });
    })

    .run();