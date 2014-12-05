'use strict';

angular.module('AngularApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/home/home.html'
        });
    }])

    .controller('homeCtrl', ['$scope', 'dealsFactory', function ($scope, dealsFactory) {
        $scope.orderByField="";
        $scope.reverse=false;

        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.itemsPerPage=5;

        $scope.returnParentScope=function(){
            return $scope
        }
        $scope.doSearch= function(){
                $scope.searchRes=$scope.searchTerm;
        }

        dealsFactory.getAllDeals().success(function (deals) {

            $scope.tableHeaders = Object.keys(deals[0]);
            $scope.tableHeaders.splice($scope.tableHeaders.indexOf('_id'), 1);
            var originInject = "";
            var classInject = "";
            var unitInject = "";
            deals.forEach(function (entry){
                if(entry.origin==1){
                    entry.imageLink = 'http://www.netto.dk'+entry.imageLink
                }
            })

            dealsFactory.getOrigin().success(function (origins) {
                originInject = origins;

                dealsFactory.getClass().success(function (classes) {
                    classInject = classes;

                    dealsFactory.getUnit().success(function (units) {
                        unitInject = units;

                        var maxLen = Math.max(originInject.length, classInject.length, unitInject.length);
                        for (var i = 0; i < maxLen; i++) {
                            if (i < originInject.length) {
                                originInject[i] = originInject[i].title;
                            }
                            if (i < classInject.length) {
                                classInject[i] = classInject[i].title;
                            }
                            if (i < unitInject.length) {
                                unitInject[i] = unitInject[i].title;
                            }
                        }

                        deals.forEach(function (entry) {
                            if(entry.imageLink==null || entry.imageLink=="" || entry.imageLink==undefined)
                                entry.imageLink="N/A";
                            if(entry.startDate==null || entry.startDate=="" || entry.startDate==undefined)
                                entry.startDate="N/A";
                            if(entry.endDate==null || entry.endDate=="" || entry.endDate==undefined)
                                entry.endDate="N/A";

                            entry.origin = originInject[parseInt(entry.origin)];
                            entry.class = classInject[parseInt(entry.class)];
                            entry.unit = unitInject[parseInt(entry.unit)];
                        });
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
            })
            $scope.deals = deals;
            $scope.totalItems=deals.length;
        })
    }]);
