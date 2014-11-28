var db = require("../model/db");
var crawler = require("../crawlers/fakta");
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

function getPriceFromPris (string){
    string = string.replace(/,/g, '.');
    var regex = new RegExp("[0-9]*[.][0-9]+", "i");
    var match = regex.exec(string);
    return parseFloat(match[0]);
}

function injectToDB () {
    crawler.crawl(function (data) {
	var dat = Date.now();
	var arr = data.map(function (el) {
	    var ob = {origin: 2};
	    ob.title = el.Titel;
	    ob.price = getPriceFromPris(el.Pris);
	    ob.date = dat;
	    return ob;
	});
	Product.create(arr, function (err) {
	    console.log("done!");
	    if (err) {};
	});
    });
}

injectToDB();
