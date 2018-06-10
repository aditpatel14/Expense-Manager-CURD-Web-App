//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

//connect to MongoDB
mongoose.connect('mongodb://localhost/testaroo');
//checks if connection was successful
mongoose.connection.once('open', function(){
  console.log('Connection to db made!')
}).on('error', function(error){
  console.log('Connection error: ', error)
});

app.use('/', router);

module.exports=app;
