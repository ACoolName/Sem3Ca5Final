var db = require("./db");
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var crawler = require('../crawlers/netto');
var objectTranslator = require("../../server/services/objectTranslator");

var injector = {};

injector.start = function (callback) {
  injector.inject(callback);
};

injector.inject = function (callback) {
    crawler.crawl(function (data) {
        var arr = data.map(function (e) {
            var p = {};
            p.origin = 1;
            p.title = e.name;
            p.imageLink = e.imageURL;
            p.startDate = e.startDate;
            p.endDate = e.endDate;
            p.date = e.date;
            p.unit = 0;
            p.price = 0;
            return p;
        });
        objectTranslator.translate(arr, "title", function () {
            Product.create(arr, function () {
                callback(null);
            });
        })
    });
};

module.exports = injector;