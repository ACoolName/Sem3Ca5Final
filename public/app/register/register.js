'use strict';

angular.module('AngularApp.register', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'app/register/register.html'
        });
    }])

    .controller('registerCtrl',['$scope', function ($scope) {

    }]);