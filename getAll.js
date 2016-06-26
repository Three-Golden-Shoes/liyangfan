var express = require('express');
//var app = express();
var router = express();
var fs = require("fs");

router.get('/products', function (req, res) {
    fs.readFile('test.json', 'utf8', function (err, data) {

        if (err) {
            res.status(404).send();
            return;
        }
        if (data === '') {
            res.status(404).send('[]');
        } else {
            data = JSON.parse(data);
        }
        res.status(200).json(data);
    });
});

module.exports = router;