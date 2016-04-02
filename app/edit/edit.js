'use strict';

angular.module('checklist.edit', [
        'checklist.components.firebase',
        'ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider.when('/edit/:listId', {
            controller: 'EditCtrl',
            templateUrl: 'edit/edit.html'
        });
    })

    .controller('EditCtrl', function ($scope, $routeParams, fbobject) {
        var listId = $routeParams.listId;
        $scope.list = fbobject.byId('/lists', listId);
    });
