var should = require("should");
var translator = require("../../server/services/translator");

describe("translator class", function () {
    describe("Should translate from danish to english", function () {
        it("Single value list", function (done) {
            this.timeout(10000);
            translator.translate(["smør"], function (words) {
                words.should.eql(["butter"]);
                done();
            });
        });

        it("Multi value list", function (done) {
            this.timeout(10000);
            translator.translate(["smør", "chokolade"], function (words) {
                words.should.eql(["butter", "chocolate"]);
                done();
            });
        });
    });
});
