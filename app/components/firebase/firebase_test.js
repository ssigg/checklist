'use strict';

describe('checklist.components.firebase', function () {
    describe('fbarray', function () {
        var queryObject, endAtSpy, startAtSpy, orderByChildSpy, referenceObject, fbarray, fbrefSpy, firebaseArraySpy;
        beforeEach(module('checklist.components.firebase', function ($provide) {
            queryObject = {};
            endAtSpy = jasmine.createSpy('endAt').and.returnValue(queryObject);
            startAtSpy = jasmine.createSpy('startAt').and.returnValue({'endAt': endAtSpy});
            orderByChildSpy = jasmine.createSpy('orderByChild').and.returnValue({'startAt': startAtSpy});
            referenceObject = {
                'orderByChild': orderByChildSpy
            };

            fbrefSpy = jasmine.createSpy('fbref').and.returnValue(referenceObject);
            $provide.value('fbref', fbrefSpy);

            firebaseArraySpy = jasmine.createSpy('$firebaseArray');
            $provide.value('$firebaseArray', firebaseArraySpy);
        }));

        beforeEach(inject(function (_fbarray_) {
            fbarray = _fbarray_;
        }));

        describe('fbarray.byPath()', function () {
            it('should create a reference using the path', function () {
                expect(fbrefSpy).not.toHaveBeenCalled();
                fbarray.byPath('/path/to/value');
                expect(fbrefSpy).toHaveBeenCalledWith('/path/to/value');
            });

            it('should create a firebase array using the reference', function () {
                expect(firebaseArraySpy).not.toHaveBeenCalled();
                fbarray.byPath('/path/to/value');
                expect(firebaseArraySpy).toHaveBeenCalledWith(referenceObject);
            });
        });

        describe('fbarray.byChildValue()', function () {
            it('should create a reference using the path', function () {
                expect(fbrefSpy).not.toHaveBeenCalled();
                fbarray.byChildValue('/path/to/value', 'child', 'value');
                expect(fbrefSpy).toHaveBeenCalledWith('/path/to/value');
            });

            it('should order by child value', function () {
                expect(orderByChildSpy).not.toHaveBeenCalled();
                fbarray.byChildValue('/path/to/value', 'child', 'value');
                expect(orderByChildSpy).toHaveBeenCalledWith('child');
            });

            it('should start at value', function () {
                expect(startAtSpy).not.toHaveBeenCalled();
                fbarray.byChildValue('/path/to/value', 'child', 'value');
                expect(startAtSpy).toHaveBeenCalledWith('value');
            });

            it('should end at value', function () {
                expect(endAtSpy).not.toHaveBeenCalled();
                fbarray.byChildValue('/path/to/value', 'child', 'value');
                expect(endAtSpy).toHaveBeenCalledWith('value');
            });

            it('should create a firebase array using the query', function () {
                expect(firebaseArraySpy).not.toHaveBeenCalled();
                fbarray.byChildValue('/path/to/value', 'child', 'value');
                expect(firebaseArraySpy).toHaveBeenCalledWith(queryObject);
            });
        });

        describe('fbarray.byQuery()', function () {
            it('should create a firebase array using the query', function () {
                expect(firebaseArraySpy).not.toHaveBeenCalled();
                fbarray.byQuery('query');
                expect(firebaseArraySpy).toHaveBeenCalledWith('query');
            });
        });
    });

    describe('fbobject', function () {
        var pushSpy, referenceObject, fbobject, fbrefSpy, firebaseObjectSpy;
        beforeEach(module('checklist.components.firebase', function ($provide) {
            pushSpy = jasmine.createSpy('push');
            referenceObject = {
                'push': pushSpy
            };

            fbrefSpy = jasmine.createSpy('fbref').and.returnValue(referenceObject);
            $provide.value('fbref', fbrefSpy);

            firebaseObjectSpy = jasmine.createSpy('$firebaseObject');
            $provide.value('$firebaseObject', firebaseObjectSpy);
        }));

        beforeEach(inject(function (_fbobject_) {
            fbobject = _fbobject_;
        }));

        describe('fbobject.byId()', function () {
            it('should create a reference using the path and the id', function () {
                expect(fbrefSpy).not.toHaveBeenCalled();
                fbobject.byId('/path/to/value', 'id');
                expect(fbrefSpy).toHaveBeenCalledWith('/path/to/value/id');
            });

            it('should create a firebase array using the reference', function () {
                expect(firebaseObjectSpy).not.toHaveBeenCalled();
                fbobject.byId('/path/to/value', 'id');
                expect(firebaseObjectSpy).toHaveBeenCalledWith(referenceObject);
            });
        });

        describe('fbobject.create()', function () {
            it('should create a reference using the path', function () {
                expect(fbrefSpy).not.toHaveBeenCalled();
                fbobject.create('/path/to/value', {'key': 'value'});
                expect(fbrefSpy).toHaveBeenCalledWith('/path/to/value');
            });

            it('should push the data', function () {
                expect(pushSpy).not.toHaveBeenCalled();
                fbobject.create('/path/to/value', {'key': 'value'});
                expect(pushSpy).toHaveBeenCalledWith({'key': 'value'});
            });
        });
    });
});