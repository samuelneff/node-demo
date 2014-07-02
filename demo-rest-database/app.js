var express = require('express');


var app = express();

app.use('/hi', function(req, res, next) {res.send('hi'); });

app.