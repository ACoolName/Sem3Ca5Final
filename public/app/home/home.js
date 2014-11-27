'use strict';

angular.module('AngularApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/home/home.html'
        });
    }])

    .controller('homeCtrl', ['$scope', 'dealsFactory', function ($scope, dealsFactory) {
        var obj=[{
            name:"asd",
            age:"something",
            city:"something else"
        },
            {
                name:"asd",
                age:"asd",
                city:"asd"
            }]
            console.log(Object.keys(obj));

        //dealsFactory.getAllDeals().success(function(deals){
            $scope.tableHeaders=Object.keys(obj[0])
            $scope.deals = obj;
        //})
    }]);