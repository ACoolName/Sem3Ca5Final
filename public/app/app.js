'use strict';

// Declare app level module which depends on views, and components
angular.module('AngularApp', [
    'ngRoute',
    'AngularApp.controllers',
    'AngularApp.directives',
    'AngularApp.services',
    'AngularApp.factories',
    'AngularApp.filters',
    'AngularApp.home',
    'AngularApp.register'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });