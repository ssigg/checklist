'use strict';

describe('checklist.edit', function () {
    var scope, byIdSpy, routeParams;

    beforeEach(function () {
        module('checklist.edit');

        inject(function (_$rootScope_, $controller, _fbobject_) {
            scope = _$rootScope_.$new();

            byIdSpy = spyOn(_fbobject_, 'byId');

            routeParams = {
                'listId': 'id1'
            };

            $controller('EditCtrl', {$scope: scope, $routeParams: routeParams});
            scope.$digest();
        });
    });

    describe('EditCtrl', function () {
        describe('$scope.list', function () {
            it('should fetch the list', function () {
                var listId = routeParams.listId;
                expect(byIdSpy).toHaveBeenCalledWith('/lists', listId);
            });
        });
    });
});