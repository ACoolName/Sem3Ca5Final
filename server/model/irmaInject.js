var db = require("./db");
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var objectTranslator = require("../services/objectTranslator");
var request = require('request');

var injector = {};

injector.start = function (callback) {
    injector.inject(callback);
};

function extractUnit(priceAndUnit) {
    var res = priceAndUnit.split(" ");
    return res[res.length];
}

injector.inject = function (callback) {
    request('https://irma.dk/api/catalog/search?Offer=HasOffer&page=1&pageSize=100000&format=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonBody = JSON.parse(body);
            var products = jsonBody.model.products;

            var arr = [];

            products.forEach(function (entry) {
                var p = {};
                p.origin = 4;  //origin 4 => Irma
                p.title = entry.displayName;
                p.imageLink = entry.freeTextImageUrl;   //freeTextImageUrl
                //p.startDate = "";
                //p.endDate = "";
                //p.class ="";
                p.date = Date.now();
                p.unit = extractUnit(entry.pricePerUnitText);         //pricePerUnitText
                p.price = entry.salesPrice.value;  //sales price{value}

                arr.push(p);
            });

            objectTranslator.translate(arr, "title", function () {
                Product.create(arr, function () {
                    callback(arr);
                });
            });
        }
    });
};

module.exports = injector;