/*
  Front-end script that drops the collection and calls
  the crawlers for the deals to fill the db.
*/
var db = require("./db");
var netto = require("./nettoInject");
var fakta = require("./faktaInject");
var Product = mongoose.model('Product');

function doneLog(data){
    console.log("done!");
}

netto.start(doneLog);
fakta.start(doneLog);
