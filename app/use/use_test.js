'use strict';

describe('checklist.use', function () {
    var scope, saveSpy, byPathSpy, routeParams;

    beforeEach(function () {
        module('checklist.use');

        inject(function (_$rootScope_, $controller, _fbarray_) {
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
    });
});