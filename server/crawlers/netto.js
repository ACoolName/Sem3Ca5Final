var Crawler = require("crawler");
var url = require('url');

var site = 'http://www.netto.dk/tilbud/Pages/Ugens-tilbud.aspx';
var productlist = '.element';
var productname = "#hdproductTitle";
var productValue = ".priceValue";
var productDescription = "#hdShortDescription";
var productImageURL = "#hdimageUrl";
var productStartDate = "#hdStartDate";
var productEndDate = "#hdEndDate";

function priceExtract(string) {
    string = string.replace(/,/g, '.');
    string = string.replace(/-/g, '0');
    var regex = new RegExp("[0-9]*[.][0-9]+", "i");
    var match = regex.exec(string);
    return parseFloat(match[0]);
}

function extractItem(item, date, $) {
    var extract = function (search) {
        return $(item).find(search)['0'].attribs.value;
    }
    var pr = $(item).find(productValue)['0'].children[0].data;
    
    return {'name': extract(productname),
        'description': extract(productDescription),
        'imageURL': extract(productImageURL),
        'startDate': extract(productStartDate),
        'endDate': extract(productEndDate),
        'date': date,
	'price': priceExtract(pr)};
}

/*
 Crawl function.
 cb must accept one argument - the data.
 data is in the form [{raw item}, {raw item}, {raw item}]
 */
function crawl(cb) {
    var nettoCrawler = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, result, $) {
            var res = [];
            var isodate = new Date().toISOString();
            res = $(productlist).map(function (index, el) {
                return [extractItem(el, isodate, $)];
            });
            cb(res.get());
        }
    });

    nettoCrawler.queue(site);

}

module.exports = {crawl: crawl,
    extractItem: extractItem}


