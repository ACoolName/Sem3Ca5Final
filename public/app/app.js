'use strict';

// Declare app level module which depends on views, and components
angular.module('AngularApp', [
    'ngRoute',
    'ngAnimate',
    'AngularApp.controllers',
    'AngularApp.directives',
    'AngularApp.services',
    'AngularApp.factories',
    'AngularApp.filters',
    'AngularApp.home',
    'AngularApp.register',
    'ui.bootstrap',
    'trNgGrid'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .run(function () {
        TrNgGrid.defaultColumnOptions.displayAlign="center";
        TrNgGrid.defaultPagerMinifiedPageCountThreshold = 5;
    })
