global.TEST_DATABASE = "mongodb://localhost/TestDataBase_Final";
global.JPA = true;

var should = require("should");
var sinon = require("sinon");
var app = require("../../server/app");
var request = require("request");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var User = mongoose.model("User");


// Integrated tested with the exception of the remote Java server
describe('REST API for /authenticate', function () {
    var sandbox;

    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();
        User.remove({}, function () {
            var array = [
                {username: "test1", email: "e", role: "admin", authid: "1"},
                {username: "test2", email: "e2", role: "admin", authid: "2"}
            ];
            User.create(array, function (err) {
                done();
            });
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    function getStub() {
        var authid = 1;
        sandbox.stub(request, "get").withArgs('http://acoolname.cloudapp.net/customer/' + authid).yields(
            null, {statusCode: 200}, JSON.stringify({id: authid, hash: "$2a$10$1xKYkCVVt5Rx9XZAEsFXmOhIM3LI4aw0IkHNCPBJQbsGlBZakqjY2"}));
    }

    after(function () {  //Stop server after the test
        testServer.close();
    });

    it("should login when given correct username and password", function (done) {
        getStub();
        request.post('http://localhost:' + testPort + '/authenticate',
            {form: { username: "test1", password: "bacon" }},
            function (error, response, body) {
                var obj = JSON.parse(body);
                should.exist(obj.token);
                done();
            });
    });

    it("should return 401 when given incorrect password", function (done) {
        getStub();
        request.post('http://localhost:' + testPort + '/authenticate',
            {form: { username: "test1", password: "incorrect" }},
            function (error, response, body) {
                response.statusCode.should.equal(401);
                done();
            });
    });
});
