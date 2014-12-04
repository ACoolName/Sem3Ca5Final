var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require("../model/user");
var request = require("request");
var bcrypt = require("bcrypt-nodejs");


/* GET home page. */
router.get('/', function (req, res) {
    res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {

    if(!global.JPA) { //Set the global to false if you don't want to use JPA
        if (req.body.username === 'student' && req.body.password === 'test') {
            var profile = {
                username: 'Bo the Student',
                role: "user",
                id: 1000
            };
            // We are sending the profile inside the token
            var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, { expiresInMinutes: 60 * 5 });
            res.json({ token: token });
            return;
        }

        if (req.body.username === 'teacher' && req.body.password === 'test') {
            var profile = {
                username: 'Peter the Teacher',
                role: "admin",
                id: 123423
            };
            // We are sending the profile inside the token
            var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60 * 5 });
            res.json({ token: token });
            return;
        }

        else {
            res.status(401).send('Wrong user or password');
            return;
        }
    }

    User.get(req.body.username, function (err, user) {
        request.get('http://acoolname.cloudapp.net/customer/' + user.authid, function (error, response, body) {
            var hash = JSON.parse(body).hash;
            bcrypt.compare(req.body.password, hash, function(err, correct) {
                if(correct == true) {
                    res.json({ token: "kkdk" });
                } else {
                    res.status(401).send('Wrong user or password');
                }
            });
        })
    });

});


//Get Partials made as Views
router.get('/partials/:partialName', function (req, res) {
    var name = req.params.partialName;
    res.render('partials/' + name);
});

module.exports = router;
