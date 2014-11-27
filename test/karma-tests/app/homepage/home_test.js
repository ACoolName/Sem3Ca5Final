'use strict';

describe('AngularApp.home module', function () {
    var scope, httpBackendMock, ctrl, dealsFactory;
    beforeEach(module('AngularApp.home'));
    beforeEach(module('AngularApp.factories'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller, _dealsFactory_) {
        httpBackendMock = $httpBackend;
        dealsFactory = _dealsFactory_;
        scope = $rootScope.$new();
        ctrl = $controller('homeCtrl', {$scope: scope});
    }));

    describe('homeCtrl controller functionality test in full isolation', function () {

        it('should exist', function () {
            expect(ctrl).toBeDefined();
        });

        it('should get the data',function(){
            var dummy=[{
                    name:"asd",
                    age:"something",
                    city:"something else"
                },
                    {
                        name:"asd",
                        age:"asd",
                        city:"asd"
                    },
                {
                    name:"",
                    age:"",
                    city:""
                }]
            httpBackendMock.expectGET('/rest/v1/Product').respond(dummy);
            httpBackendMock.flush();
            var expectedTableHeaders=["name","age","city"];
            expect(scope.tableHeaders).toEqual(expectedTableHeaders);
            expect(scope.deals).toEqual(dummy);
        })
    })
})