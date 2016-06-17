'use strict';

angular.module('checklist', [
        'checklist.create',
        'checklist.edit',
        'checklist.use'])

    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/create'
        });
    })

    .run();