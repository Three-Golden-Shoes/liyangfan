var express = require('express');
var router = express();
var fs = require("fs");

router.get('/products/:id', function (req, res) {
    fs.readFile("test.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var item;

        for (var i = 0; i < data.length; i++) {
            if (parseInt(req.params.id) === data[i].id) {
                item = data[i];
            }
        }
        if(item!=undefined){
            res.status(200).json(item);
        }else{
            res.status(404).send();

        }
    });
});

module.exports = router;