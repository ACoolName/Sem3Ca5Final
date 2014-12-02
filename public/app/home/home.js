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
                originInject = origins;

                $http({
                    method: 'GET',
                    url: '/rest/v1/Class'
                }).then(function (classes) {
                    classInject = classes;

                    $http({
                        method: 'GET',
                        url: '/rest/v1/Unit'
                    }).then(function (units) {
                        unitInject = units;

                        originInject = originInject.data;
                        classInject = classInject.data;
                        unitInject = unitInject.data;

                        var maxLen = Math.max(originInject.length, classInject.length, unitInject.length);
                        for(var i = 0; i < maxLen; i++) {
                            if(i < originInject.length) {
                                originInject[i] = originInject[i].title;
                            }
                            if(i < classInject.length) {
                                classInject[i] = classInject[i].title;
                            }
                            if(i < unitInject.length) {
                                unitInject[i] = unitInject[i].title;
                            }
                        }

                        deals.forEach(function (entry) {
                            entry.origin = originInject[parseInt(entry.origin)];
                            entry.class = classInject[parseInt(entry.class)];
                            entry.unit = unitInject[parseInt(entry.unit)];
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

            $scope.tableHeaders = Object.keys(deals[0]);
            $scope.tableHeaders.splice($scope.tableHeaders.indexOf('_id'), 1);
            $scope.deals = deals;
        })
    }])
;
