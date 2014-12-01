/*
  Front-end script that drops the collection and calls
  the crawlers for the deals to fill the db.
*/
var db = require("./db");
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var netto = require("./nettoInject");
var fakta = require("./faktaInject");

function doneLog(data){
    if (data != null){
	console.log("done! Inserting objs:" + data.length);
    } else {
	console.log("error!");
    }
}

Product.collection.drop(function(){
    netto.start(doneLog);
    fakta.start(doneLog);
});
