"use strict";

/* Directives */

angular.module("AngularApp.directives", []).
    directive("dealsTableDisplay", function () {
        return {
            restrict: "AE",
            replace: "true",
            require: ['ngModel'],
            templateUrl:"directiveTemplates/dealsTableDisplayTemplate.html"
        };
    });