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

    describe('homeCtrl controller functionality test', function () {

        it('should exist', function () {
            expect(ctrl).toBeDefined();
        });

        it('should get the data', function () {
            var dummy = [{
                origin: undefined,
                price: '2',
                title: 'test',
                class: undefined,
                unit: undefined,
                date: '2014-12-04',
                imageLink: "someLink",
                startDate: '2014-12-04',
                endDate: '2014-12-04'
            }];
            httpBackendMock.expectGET('/rest/v1/Product').respond(dummy);
            httpBackendMock.expectGET('/rest/v1/Origin').respond("");
            httpBackendMock.expectGET('/rest/v1/Class').respond("");
            httpBackendMock.expectGET('/rest/v1/Unit').respond("");

            httpBackendMock.flush();

            var expectedTableHeaders = ['origin', 'price', 'title', 'class', 'unit', 'date', 'startDate'];
            expect(scope.tableHeaders).toEqual(expectedTableHeaders);
            expect(scope.deals).toEqual(dummy);
        })
    })
})