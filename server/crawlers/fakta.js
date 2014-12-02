var Crawler = require("crawler");
var url = require('url');

var site = "http://www.fakta.dk/tilbudsavis/produkter/naeste-uges-tilbud.html";
//"http://www.fakta.dk/tilbudsavis/produkter/tilbud.html";

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
	    var Fakta = {Session:{}};
	    eval($("script")['9'].children[0].data);
	    cb(Fakta.Session.products);
	}
    });

    nettoCrawler.queue(site);
}

module.exports = {crawl: crawl}
