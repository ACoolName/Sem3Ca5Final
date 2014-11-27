var translator = {};

var EMAIL = "acoolnameca5@gmail.com";
var PASS = "";

translator.translate = function (words, callback) {
    var GoogleSpreadsheet = require("google-spreadsheet");
    var my_sheet = new GoogleSpreadsheet('1az_qUonXkT6nOJKt1y5kvGAoZvAv3yUvbSYU6fsUw5Q');
    // without auth -- read only
    // # is worksheet id - IDs start at 1

    // set auth to be able to edit/add/delete
    my_sheet.setAuth(EMAIL, PASS, function (err) {

        my_sheet.getInfo(function (err, sheet_info) {
            // use worksheet object if you want to forget about ids
            sheet_info.worksheets[0].getRows(function (err, rows) {
                var translateString = "";
                words.forEach(function (e, index) {
                    translateString += e + ". ";
                });
                translateString = '=gTranslate("' + translateString.slice(0, -2) +
                    '", "da", "en")';

                rows[0].value = translateString;
                rows[0].save(function (ss_data) {
                    my_sheet.getRows(1, function (err, row_data) {
                        callback(row_data[0].value.split(". "));
                    });
                });

                //Leave this just in case (it doesn't work tho)
//                var finished = 0;
//                function foo() {
//                    finished++;
//                    if(words.length == finished) {
//                        my_sheet.getRows(1, function (err, row_data) {
//                            var list = [];
//                            row_data.forEach(function (e) {
//                               list.push(e.value);
//                            });
//                            callback(list);
//                        });
//                    }
//                }
//                words.forEach(function (e, index) {
//                    rows[index].value = '=gTranslate("' + e + '", "da", "en")';
//                    rows[index].save(function (ss_data) {
//                        foo();
//                    });
//                });

            });
        });
    });
};

module.exports = translator;