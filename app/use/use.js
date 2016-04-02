'use strict';

angular.module('checklist.use', [
        'checklist.components.firebase',
        'ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider.when('/use/:listId', {
            controller: 'UseCtrl',
            templateUrl: 'use/use.html'
        });
    })

    .controller('UseCtrl', function ($scope, $routeParams, fbarray) {
        var listId = $routeParams.listId;
        $scope.items = fbarray.byPath('/lists/' + listId + '/items');

        $scope.flip = function (item) {
            item.checked = !item.checked;
            $scope.items.$save(item);
        }
    });