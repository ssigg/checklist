'use strict';

describe('checklist.create', function () {
    var scope, pathSpy, listKey, createSpy;

    beforeEach(function () {
        module('checklist.create');

        inject(function (_$rootScope_, $controller, _$location_, _fbobject_) {
            scope = _$rootScope_.$new();

            pathSpy = spyOn(_$location_, 'path');

            listKey = 'listKey';
            var listRef = {
                key: function () {
                    return listKey;
                }
            };
            createSpy = spyOn(_fbobject_, 'create').and.returnValue(listRef);

            $controller('CreateCtrl', {$scope: scope});
            scope.$digest();
        });
    });

    describe('CreateCtrl', function () {
        describe('$scope.create()', function () {
            it('should create a list', function () {
                var name = 'name';
                expect(createSpy).not.toHaveBeenCalled();
                scope.create(name);
                expect(createSpy).toHaveBeenCalledWith('/lists', {'name': name, 'items': []});
            });

            it('should redirect to the created list', function () {
                var name = 'name';
                expect(pathSpy).not.toHaveBeenCalled();
                scope.create(name);
                expect(pathSpy).toHaveBeenCalledWith('/edit/' + listKey);
            });
        });
    });
});