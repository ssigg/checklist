'use strict';

angular.module('checklist.components.firebase', ['firebase', 'checklist.config'])

    .service('fbref', function (FBURL) {
        return function (path) {
            var firebaseUrl = path === undefined ? FBURL : FBURL + '/' + path;
            var fbref = new Firebase(firebaseUrl);
            return fbref;
        };
    })

    .service('fbarray', function ($firebaseArray, fbref) {
        return {
            byPath: function (path) {
                var fbarray = $firebaseArray(fbref(path));
                return fbarray;
            },
            byChildValue: function (path, child, value) {
                var query = fbref(path).orderByChild(child).startAt(value).endAt(value);
                var fbarray = $firebaseArray(query);
                return fbarray;
            },
            byQuery: function (query) {
                var fbarray = $firebaseArray(query);
                return fbarray;
            }
        }
    })

    .service('fbobject', function ($firebaseObject, fbref) {
        return {
            byId: function (path, id) {
                var query = fbref(path + '/' + id);
                var fbobject = $firebaseObject(query);
                return fbobject;
            },
            create: function (path, data) {
                return fbref(path).push(data);
            }
        }
    });