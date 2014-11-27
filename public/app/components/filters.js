'use strict';

/* Filters */

angular.module('AngularApp.filters', []).
    filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    });
