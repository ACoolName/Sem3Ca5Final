'use strict';

global.JPA = false;

var db = require('../../server/model/db');
var mongoose = require("mongoose");
var Product = mongoose.model('Product');

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('/');

    it('should automatically redirect to /home when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/home");
    });


    describe('home', function () {

        beforeEach(function () {
            browser.get('#/home');
        });


        it('should display the user name when logged in', function () {
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
        describe("should display table", function () {
            beforeEach(function (done) {
                browser.get('#/home');
                Product.remove({}, function () {
                    var array = [
                        new Product({title: "Fake One"}),
                        new Product({title: "Fake Two"})
                    ];
                    Product.create(array, function (err) {
                        Product.find({}, function (err, obj) {
                            done();
                        });
                    });
                });
            });

            afterEach(function (done) {
                Product.remove({}, function () {
                    done();
                });
            });

            it('should ...', function () {
                var headers = element.all(by.repeater('thead in tableHeaders'));
                expect(headers.count()).toEqual(1);
            });

        });


    });


    describe('register', function () {


    });
});
