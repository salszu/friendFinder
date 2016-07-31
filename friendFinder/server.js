//npm dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//routing
var htmlRoutes = require('./app/routing/html-routes');
var apiRoutes = require('./app/routing/api-routes');
//port
var app = express();
var PORT = process.env.PORT || 3000;
//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//express
app.use('/', express.static(__dirname + '/app/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
//require
app.use('/', htmlRoutes);
app.use('/', apiRoutes);
//listener
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});