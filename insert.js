var express = require('express');
var router = express();
var fs = require("fs");

router.post('/products', function (req, res) {

    if (req.body.barcode === undefined || req.body.name === undefined || req.body.unit === undefined || req.body.price === undefined
        || typeof (req.body.barcode) != 'string' || typeof (req.body.name) != 'string' || typeof (req.body.unit) != 'string' || typeof (req.body.price) != 'number') {
        res.status(400).json();
        return;
    }

    fs.readFile("test.json", "utf8", function (err, data) {

        if (data === '' || data === []) {
            data = [{"count": 1}];

        } else if (data != [{"count": 1}]) {
            data = JSON.parse(data);//JSON.parse()解析字符串作为JSON
        }
        var item = {
            "id": data[0].count,
            "barcode": req.body.barcode,
            "name": req.body.name,
            "unit": req.body.unit,
            "price": req.body.price
        }

        data[parseInt(data.length)] = item;
        data[0].count++;

        fs.writeFile('test.json', JSON.stringify(data), function (err) {
            if (err) {
                res.status(404).send();
                return;
            }
        });

        res.status(200).json(item);

    });
});

module.exports = router;