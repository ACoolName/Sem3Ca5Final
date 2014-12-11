var db = require("../model/db");
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var natural = require('natural');


function classifyLog() {
    console.log("Loading...");
    Product.find({}, function (err, data){
	natural.BayesClassifier.load('server/services/classifier_data.json',
				     null,
				     function(err, classifier) {
					 data.forEach(function (e) {
					     var p = e.title.split("/");
					     console.log("Title:" + e.title + " Class:" + classifier.classify(p[1]));
					 });
				     });
    });
}
classifyLog();
