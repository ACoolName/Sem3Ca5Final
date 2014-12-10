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

router.post('/user', function (req, res) {
    var user = new User(req.body);
    res.status(200);
    res.end();
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
        if(user == null) {
            res.status(404).send('No such with that username');
            return;
        }
        request.get('http://acoolname.cloudapp.net/customer/' + user.authid, function (error, response, body) {
            if(response.statusCode != 200) {
                res.status(500).send('Internal server error');
                return;
            }
            var hash = JSON.parse(body).hash;
            bcrypt.compare(req.body.password, hash, function(err, correct) {
                if(correct == true) {
                    var profile = {
                        username: user.username,
                        role: user.role,
                        id: user._id
                    };
                    var secret;
                    if(user.role === "admin") {
                        secret = require("../security/secrets").secretTokenAdmin;
                    } else if (user.role === "user") {
                        secret = require("../security/secrets").secretTokenUser;
                    } else {
                        res.status(500).send('Internal server error');
                        return;
                    }
                    var token = jwt.sign(profile, secret, { expiresInMinutes: 60 * 5 });
                    res.json({ token: token });
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
