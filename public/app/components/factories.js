'use strict';

/* Factories */

angular.module('AngularApp.factories', [])
    .factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return $q.reject(rejection);
            }
        };
    })
    .factory('dealsFactory', function ($http) {
        var getAllDeals= function(){
            return $http({
                method:'GET',
                url:'/rest/v1/Product'
            })
        }

        return{
            getAllDeals:getAllDeals
        }

    })