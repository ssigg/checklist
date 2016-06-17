'use strict';

angular.module('checklist.use', [
        'checklist.components.firebase',
        'ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider.when('/:listId', {
            controller: 'UseCtrl',
            templateUrl: 'use/use.html'
        });
    })

    .controller('UseCtrl', function ($scope, $location, $routeParams, fbarray) {
        $scope.listId = $routeParams.listId;
        $scope.items = fbarray.byPath('/lists/' + $scope.listId + '/items');

        $scope.flip = function (item) {
            item.checked = !item.checked;
            $scope.items.$save(item);
        }

        $scope.edit = function () {
            $location.path('/edit/' + $scope.listId);
        }

        $scope.create = function () {
            $location.path('/create');
        }
    });