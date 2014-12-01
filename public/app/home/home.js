'use strict';

angular.module('AngularApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/home/home.html'
        });
    }])

    .controller('homeCtrl', ['$scope', 'dealsFactory', function ($scope, dealsFactory) {

        dealsFactory.getAllDeals().success(function (deals) {
            var originInject = "shit";
            var classInject = "shit";
            var unitInject = "shit";
            var $http = dealsFactory.getAllDeals.http;

            $http({
                method: 'GET',
                url: '/rest/v1/Origin'
            }).then(function (origins) {
                console.log("origin success");
                originInject = origins;
                console.log(originInject);

                $http({
                    method: 'GET',
                    url: '/rest/v1/Class'
                }).then(function (classes) {
                    console.log("class success");
                    classInject = classes;
                    console.log(classInject);

                    $http({
                        method: 'GET',
                        url: '/rest/v1/Unit'
                    }).then(function (units) {
                        console.log("unit success");
                        unitInject = units;
                        console.log(unitInject);

                        deals.forEach(function(entry) {
                            entry.origin = originInject[entry.origin];
                            entry.class = classInject[entry.class];
                            entry.unit = unitInject[entry.unit];
                        });
                        console.log(deals);
                    }, function (err) {
                        console.log("error");
                        unitInject = null;
                    });
                }, function (err) {
                    console.log("error");
                    classInject = null;
                });
            }, function (err) {
                console.log("error");
                originInject = null;
            });

            console.log();
            deals.forEach(function (entry) {
//                entry.origin = originInject[entry.origin];
            });
            $scope.tableHeaders = Object.keys(deals[0]);
            $scope.tableHeaders.splice($scope.tableHeaders.indexOf('_id'), 1);
            $scope.deals = deals;
        })
    }]);