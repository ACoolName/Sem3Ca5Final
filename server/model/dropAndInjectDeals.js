/*
 Front-end script that drops the collection and calls
 the crawlers for the deals to fill the db.
 */
var db = require("./db");
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var netto = require("./nettoInject");
var fakta = require("./faktaInject");
var irma = require("./irmaInject");

function doneLog(data) {
    console.log("End " + Date.now());
    if (data != null) {
        console.log("done! Inserting objs:" + data.length);
    } else {
        console.log("error!");
    }
}

Product.collection.drop(function () {
    console.log("Start " + Date.now());
    //netto.start(doneLog);
    fakta.start(doneLog);
    irma.start(doneLog);
});
