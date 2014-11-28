var translator = require("./translator");

var objectTranslator = {};

objectTranslator.translate = function (objects, field, callback) {
    var words = [];

    objects.forEach(function (e) {
       words.push(e[field]);
    });

    translator.translate(words, function (newWords) {
        objects.forEach(function (e, index) {
            e[field] = e[field] + "/" + newWords[index];
        });
        callback();
    });
};

module.exports = objectTranslator;