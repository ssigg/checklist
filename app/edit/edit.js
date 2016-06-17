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

    .controller('EditCtrl', function ($scope, $location, $routeParams, fbobject, fbarray) {
        var listId = $routeParams.listId;
        $scope.list = fbobject.byId('/lists', listId);
        $scope.items = fbarray.byPath('/lists/' + listId + '/items');

        $scope.add = function(items) {
            var data = {
                'name': '',
                'checked': false
            };
            items.$add(data);
        }

        $scope.remove = function(items, item) {
            items.$remove(item);
        }
        
        $scope.save = function(list, items) {
            _.each(items, function(item) {
                list.items[item.$id] = item;
            });
            list.$save();
            $location.path('/' + list.$id)
        }
    });
