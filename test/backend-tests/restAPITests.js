global.TEST_DATABASE = "mongodb://localhost/TestDataBase_Final";
global.SKIP_AUTHENTICATION = true;
global.JPA = true;

var should = require("should");
var sinon = require("sinon");
var app = require("../../server/app");
var request = require("request");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var User = mongoose.model("User");
var needle = require("needle");

describe('REST API for /rest', function () {
    var sandbox;

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
                done();
            });
    });

    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();
        User.remove({}, function () {
            done();
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    after(function () {
        testServer.close();
    });

    function postStub() {
        var authid = 1;
        sandbox.stub(request, "post").yields(
            null, {statusCode: 200}, JSON.stringify({id: authid}));
    }

    describe("/user", function () {
        it("should add a user to the database with correct authid", function (done) {
            postStub();
            needle.post('http://localhost:' + testPort + '/user',
                { username: "test1", password: "bacon"},
                function (error, response) {
                    response.statusCode.should.equal(200);
                    User.findOne({username: 'test1'}, function (err, user) {
                        user.authid.should.equal('1');
                        done();
                    });
                });
        })
    })
});
