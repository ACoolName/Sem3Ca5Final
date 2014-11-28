var should = require("should");
var translator = require("../../server/services/translator");
var objectTranslator = require("../../server/services/objectTranslator");
var sinon = require("sinon");

describe("objectTranslator in isolation", function () {
    describe("Should add the translation to the given field in all objects", function () {
        var sandbox, stub;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            stub = sandbox.stub(translator, "translate")
        });

        afterEach(function () {
            sandbox.restore();
        });

        it("single value list", function (done) {
            stub.yields(["butter"]);
            var object = {title: "smør"};
            objectTranslator.translate([object], "title", function () {
                object.title.should.equal("smør/butter");
                done();
            });
        });

        it("multiple value list", function (done) {
            stub.yields(["butter", "chocolate"]);
            var objects = [{title: "smør"}, {title: "chokolade"}];
            objectTranslator.translate(objects, "title", function () {
                objects.should.eql([{title: "smør/butter"}, {title: "chokolade/chocolate"}]);
                done();
            });
        });
    });
});