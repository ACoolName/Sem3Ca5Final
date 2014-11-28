'use strict';

var token =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkJvIHRoZSBTdHVkZW50Iiwicm9sZSI6InVzZXIiLCJpZCI6MTAwMCwiaWF0IjoxNDE3MTY1NzU1LCJleHAiOjE0MTcxODM3NTV9.TGz-fO9dmnAf1zedVgFq2TkxgDEczVj90imTxB0dVo4";

describe('AppCtrl', function () {
    var scope, httpBackendMock, ctrl;
    beforeEach(module('AngularApp.controllers'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackendMock = $httpBackend;
        scope = $rootScope.$new();
        ctrl = $controller('AppCtrl', {$scope: scope});
    }));

    it('should exist', function () {
        expect(ctrl).toBeDefined();
    });

    it('should login a user', function () {
        httpBackendMock.expectPOST('/authenticate').respond({token: token});
        scope.submit();
        httpBackendMock.flush();
        expect(scope.isAuthenticated).toEqual(true);
    });

    it('should login a user', function () {
        httpBackendMock.expectPOST('/authenticate').respond({token: token});
        scope.submit();
        httpBackendMock.flush();
        expect(scope.isAuthenticated).toEqual(true);
    });

});

