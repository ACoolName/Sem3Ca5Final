var db = require("./db");
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var crawler = require("../crawlers/fakta");
var translator = require("../services/objectTranslator");


var injector = {};

injector.start = function (callback) {
  injector.inject(callback);
};


function getPriceFromPris (string){
    string = string.replace(/,/g, '.');
    var regex = new RegExp("[0-9]*[.][0-9]+", "i");
    var match = regex.exec(string);
    return parseFloat(match[0]);
}

injector.inject = function (callback) {
    crawler.crawl(function (data) {
	if (data.length == 0){
	    callback(null);
	    return;
	}
	var tr = translator.translate;
	var dat = Date.now();
	var arr = data.map(function (el) {
	    var ob = {origin: 2};
	    ob.title = el.Titel.split('.').join("");
	    ob.price = getPriceFromPris(el.Pris);
	    ob.date = dat;
	    return ob;
	});
	tr(arr, "title", function() {
	    Product.create(arr, function (err) {
		callback(arr);
		if (err) {callback(null)};
	    });
	});
    });
}

module.exports = injector;
