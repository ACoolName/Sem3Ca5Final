'use strict';

describe('AngularApp.services', function () {

    beforeEach(module('AngularApp.services'));

    describe('InfoService', function () {

        var infoService;
        beforeEach(inject(function (_InfoService_) {
            infoService = _InfoService_;
        }));

        it('Should be Hello World from a Service', function () {
            expect(infoService.getInfo()).toBe("Hello World from a Service");
        });
    });


    describe('XXXService', function () {

    });
});