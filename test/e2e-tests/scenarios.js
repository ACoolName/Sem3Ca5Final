'use strict';

var db = require('../../server/model/db');
var mongoose = require("mongoose");

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('/');

    it('should automatically redirect to /view1 when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/view1");
    });


    describe('view1', function () {

        beforeEach(function () {
            browser.get('#/view1');
        });


        it('should render view1 when user navigates to /view1', function () {
            element(by.model("user.username")).sendKeys('student');
            element(by.model("user.password")).sendKeys('test');
            element(by.id('loginbtn')).click()
                .then(function () {
                    element(by.id("currentuserdisplay")).getText()
                        .then(function (text) {
                            expect(text).toEqual("Logged on as: Bo the Student");
                        });
                });
        });

    });


    describe('view2', function () {

        beforeEach(function () {
            browser.get('#/view2');
        });

    });
});
