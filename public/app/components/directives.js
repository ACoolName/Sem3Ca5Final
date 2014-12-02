"use strict";

/* Directives */

angular.module("AngularApp.directives", []).
    directive("dealsTableDisplay", function () {
        return {
            restrict: "AE",
            replace: "true",
            template: "<table class='table'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th ng-repeat='thead in tableHeaders'>{{thead}}</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                "<tr ng-repeat='tbody in deals'>" +
                        "<td ng-repeat='value in tableHeaders'>"+
                            '<div ng-if="1==1"> <img src={{thead[value]}}>{{thead[value]}} </div>'+
            "</td>" +
                        "</tr>" +
                        "</tbody>" +
                        "</table>"
        };
    }).
    directive("searchBar",function(){
        return{
            restrict:"AE",
            replace:"true",
            template:""
        }
    });