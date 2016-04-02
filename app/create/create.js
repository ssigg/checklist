'use strict';

angular.module('checklist.create', [
        'checklist.components.firebase',
        'ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider.when('/create', {
            controller: 'CreateCtrl',
            templateUrl: 'create/create.html'
        });
    })

    .controller('CreateCtrl', function ($scope, $location, fbobject) {
        $scope.create = function (name) {
            var listRef = fbobject.create('/lists', {'name': name});
            $location.path('/edit/' + listRef.key());
        }
    });
