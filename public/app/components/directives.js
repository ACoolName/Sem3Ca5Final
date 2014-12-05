"use strict";

/* Directives */

angular.module("AngularApp.directives", []).
    directive("dealsTableDisplay", function () {
        return {
            restrict: "AE",
            replace: "true",
            templateUrl:"directiveTemplates/dealsTableDisplayTemplate.html"
        };
    }).
    directive("searchBar",function(){
        return{
            restrict:"AE",
            replace:"true",
            templateUrl:"directiveTemplates/searchTemplate.html"
        }
    });