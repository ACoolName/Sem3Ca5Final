global.TEST_DATABASE = "mongodb://localhost/TestDataBase_Final";

var db = require('../../server/model/db');
var sinon = require("sinon");
var should = require("should");
var Crawler = require("../../server/crawlers/netto.js");
var nettoInject = require("../../server/model/nettoInject");
var mongoose = require("mongoose");
var Product = mongoose.model('Product');
var translator = require("../../server/services/translator");

describe("Netto crawler product creation", function () {
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Product.remove({}, function () {
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("should convert data and insert it correct into the database", function () {
        it("single fake object", function (done) {
            sandbox.stub(Crawler, "crawl").yields([
                {
                    name: "smør"
                }
            ]);
            sandbox.stub(translator, "translate").yields(['butter']);
            nettoInject.inject(function (err) {
                Product.find({}, function (er, obj) {
                    obj[0].title.should.equal("smør/butter");

                    done();
                });
            })
        });

        it("multiple fake objects", function (done) {
            sandbox.stub(Crawler, "crawl").yields([
                {
                    name: "smør"
                },
                {
                    name: "mælk"
                }
            ]);
            sandbox.stub(translator, "translate").yields(['butter', 'milk']);
            nettoInject.inject(function (err) {
                Product.find({}, function (er, obj) {
                    obj.length.should.equal(2);
                    obj[1].title.should.equal("mælk/milk");
                    done();
                });
            })
        });

        it("with real object", function (done) {
            sandbox.stub(Crawler, "crawl").yields([
                {
                    name: 'Ribbenssteg',
                    description: '<div class="Et"><p style="font-size:6pt">1100-1400 g<br />pr. kg 27.90<br />13.95 pr. ½ kg?</p></div>',
                    imageURL: 'example.com/ribbensteg.jpg',
                    startDate: '11/22/2014 12:00:00 AM',
                    endDate: '11/28/2014 11:59:59 PM',
                    date: '2014-11-28T10:28:21.973Z'
                }
            ]);
            sandbox.stub(translator, "translate").yields(['rib roast']);
            nettoInject.inject(function (err) {
                Product.find({}, function (er, obj) {
                    obj[0].title.should.equal('Ribbenssteg/rib roast');
                    obj[0].imageLink.should.equal('example.com/ribbensteg.jpg');
                    obj.length.should.equal(1);
                    done();
                });
            })
        })
    });
});