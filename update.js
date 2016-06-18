var express = require('express');
var router = express();
var fs = require("fs");

router.put('/products/:id', function (req, res) {
    var item = {
        "id": parseInt(req.params.id),
        "barcode": req.body.barcode,
        "name": req.body.name,
        "unit": req.body.unit,
        "price": req.body.price
    }
    fs.readFile("test.json", "utf8", function (err, data) {

        data = JSON.parse(data);        //JSON.parse()解析字符串作为JSON

        if (data[req.params.id] === undefined) {
            res.status(404).send();
            return;
        }

        for (var i = 1; i < data.length; i++) {
            if (parseInt(req.params.id) === data[i].id) {
                data[i] = item;
            }
        }

        fs.writeFile('test.json', JSON.stringify(data), function (err) {
            if (err) {
                res.status(404).send("文件写入失败！");
                return;
            }
        });
        res.status(201).json(item);
    });
});

module.exports = router;