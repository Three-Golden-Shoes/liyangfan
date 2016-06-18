var express = require('express');
var app = express();
var fs = require("fs");

var fileName = 'test.json';

fs.stat(fileName, function (err, stat) {
    if ((stat && stat.isFile())) {

    } else {
        fs.open(fileName,"a",function (err, fd) {
            var data = [];
            if(err){
                console.log('创建失败！');
                return;
            }
        });
    }
});

var bodyParser = require('body-parser');
var getAll = require('./getAll');
var getOne = require('./getOne');
var insert = require('./insert');
var remove = require('./remove');
var update = require('./update');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', getAll);
app.use('/', getOne);
app.use('/', insert);
app.use('/', remove);
app.use('/', update);

var server = app.listen(8000);

