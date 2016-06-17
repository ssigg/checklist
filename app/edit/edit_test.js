'use strict';

describe('checklist.edit', function () {
    var scope, byIdSpy, byPathSpy, routeParams;

    beforeEach(function () {
        module('checklist.edit');

        inject(function (_$rootScope_, $controller, _fbobject_, _fbarray_) {
            scope = _$rootScope_.$new();

            byIdSpy = spyOn(_fbobject_, 'byId');
            byPathSpy = spyOn(_fbarray_, 'byPath');

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

        describe('$scope.items', function () {
            it('should fetch the items', function () {
                var listId = routeParams.listId;
                expect(byPathSpy).toHaveBeenCalledWith('/lists/' + listId + '/items');
            });
        });

        describe('$scope.add()', function() {
            it('should add empty data to the items array', function() {
                var items = {
                    $add: function() {}
                };
                var itemsAddSpy = spyOn(items, '$add');
                var data = {
                    'name': '',
                    'checked': false
                };
                expect(itemsAddSpy).not.toHaveBeenCalled();
                scope.add(items);
                expect(itemsAddSpy).toHaveBeenCalledWith(data);
            });
        });

        describe('$scope.remove()', function() {
            it('should remove the given item', function() {
                var item = {};
                var items = {
                    $remove: function() {}
                };
                var itemsRemoveSpy = spyOn(items, '$remove');
                expect(itemsRemoveSpy).not.toHaveBeenCalled();
                scope.remove(items, item);
                expect(itemsRemoveSpy).toHaveBeenCalledWith(item);
            });
        });

        describe('$scope.save()', function() {
            it('should update the items in the list', function() {
                var list = {
                    $save: function() {},
                    items: []
                };
                var item = { $id: 'id1' };
                var items = [
                    item
                ];
                expect(list.items[item.$id]).toEqual(undefined);
                scope.save(list, items);
                expect(list.items[item.$id]).toEqual(item);
            });
            it('should call $save on the list', function() {
                var list = {
                    $save: function() {}
                };
                var items = [];
                var listSaveSpy = spyOn(list, '$save');
                expect(listSaveSpy).not.toHaveBeenCalled();
                scope.save(list, items);
                expect(listSaveSpy).toHaveBeenCalled();
            });
        });
    });
});