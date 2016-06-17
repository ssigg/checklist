'use strict';

describe('checklist.use', function () {
    var scope, saveSpy, byPathSpy, routeParams, locationPathSpy;

    beforeEach(function () {
        module('checklist.use');

        inject(function (_$rootScope_, $controller, _$location_, _fbarray_) {
            scope = _$rootScope_.$new();

            var items = {
                '$save': function () {
                }
            };
            saveSpy = spyOn(items, '$save');
            byPathSpy = spyOn(_fbarray_, 'byPath').and.returnValue(items);

            routeParams = {
                'listId': 'id1'
            };

            locationPathSpy = spyOn(_$location_, 'path');

            $controller('UseCtrl', {$scope: scope, $routeParams: routeParams});
            scope.$digest();
        });
    });

    describe('UseCtrl', function () {
        describe('$scope.items', function () {
            it('should fetch the items of the list', function () {
                var listId = routeParams.listId;
                expect(byPathSpy).toHaveBeenCalledWith('/lists/' + listId + '/items');
            });
        });

        describe('$scope.flip()', function () {
            it('should flip the checked property', function () {
                var item = {
                    'checked': false
                };
                scope.flip(item);
                expect(item.checked).toBeTruthy();
            });

            it('should save the item', function () {
                var item = {
                    'checked': false
                };
                expect(saveSpy).not.toHaveBeenCalled();
                scope.flip(item);
                expect(saveSpy).toHaveBeenCalledWith(item);
            });
        });

        describe('$scope.edit()', function() {
            it('should redirect to the edit page', function() {
                expect(locationPathSpy).not.toHaveBeenCalled();
                scope.edit();
                expect(locationPathSpy).toHaveBeenCalledWith('/edit/' + routeParams.listId);
            });
        });

        describe('$scope.create()', function() {
            it('should redirect to the create page', function() {
                expect(locationPathSpy).not.toHaveBeenCalled();
                scope.create();
                expect(locationPathSpy).toHaveBeenCalledWith('/create');
            });
        });
    });
});