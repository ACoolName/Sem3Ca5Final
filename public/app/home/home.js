'use strict';

angular.module('AngularApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/home/home.html'
        });
    }])

    .controller('homeCtrl', ['$scope', 'dealsFactory', function ($scope, dealsFactory) {

        dealsFactory.getAllDeals().success(function(deals){
            $scope.tableHeaders=Object.keys(deals[0]);
            $scope.tableHeaders.splice($scope.tableHeaders.indexOf('_id'), 1);
            $scope.deals = deals;
        })
    }]);