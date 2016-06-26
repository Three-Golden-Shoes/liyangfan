var express = require('express');
var router = express();
var fs = require("fs");

router.delete('/products/:id', function (req, res) {
    fs.readFile('test.json', 'utf8', function (err, data) {

        data = JSON.parse(data);

        if (data[req.params.id] === undefined) {
            res.status(404).send();
            return;
        }

        for (var i = 0; i < data.length; i++) {
            if (parseInt(req.params.id) === data[i].id) {
                data.splice(i, 1);
            }
        }

        fs.writeFile('test.json', JSON.stringify(data), function (err) {
            if (err) {
                res.status(404).send();
                return;
            }
        });
        res.status(204).json();
    });
});

module.exports = router;