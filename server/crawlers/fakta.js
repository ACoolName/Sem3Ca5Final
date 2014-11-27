var Crawler = require("crawler");
var url = require('url');

var site = "http://www.fakta.dk/tilbudsavis/produkter/tilbud.html";
var productlist = '.catalogue-product';
var productname = ".catalogue-name";
var productprice = ".catalogue-price span";

function extractItem(item, date, $) {
    var extract = function(search) {
	return $(item).find(search)['0'].children[0].data;
    }
    return {'name': extract(productname),
	    'price': extract(productprice),
	    'date': date};
}

/*
  Crawl function.
  cb must accept one argument - the data.
  data is in the form [{raw item}, {raw item}, {raw item}]
*/
function crawl(cb){
    var nettoCrawler = new Crawler({
	maxConnections : 10,
	// This will be called for each crawled page
	callback : function (error, result, $) {
	    var res = [];
	    var isodate = new Date().toISOString();
	    res = $(productlist).map(function(index, el) {
	    	return [extractItem(el, isodate, $)];
	    });
	    cb(res.get());
	}
    });

    nettoCrawler.queue(site);

}

module.exports = {crawl: crawl,
		  extractItem: extractItem}
