global.TEST_DATABASE = "mongodb://localhost/TestDataBase_Final";

var db = require('../../server/model/db');
var sinon = require("sinon");
var should = require("should");
var UserModel = require("../../server/model/user");
var mongoose = require("mongoose");
var User = mongoose.model("User");

describe("user model", function () {

    beforeEach(function (done) {
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

    it("should get one user by username", function (done) {
        UserModel.get("test1", function (err, user) {
            should.exist(user);
            user.role.should.equal("admin");
            done();
        });
    });

    it("should add a user", function (done) {
        UserModel.add({username: "test3", email: "e3", role: "admin", authid: "3"},
            function (err) {
                UserModel.get("test3", function (err, user) {
                    should.exist(user);
                    user.authid.should.equal("3");
                    done();
                });
            });
    });
});