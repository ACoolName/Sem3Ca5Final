'use strict';

angular.module('AngularApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/home/home.html'
        });
    }])

    .controller('homeCtrl',['$scope', function ($scope) {
        var obj={
            name:"asd",
            age:"something",
            city:"something else"
        }
        console.log(Object.keys(obj));
    }]);