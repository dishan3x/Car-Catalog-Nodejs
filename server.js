"use strict";

var PORT = 3026;

var fs = require('fs');
var http = require('http');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
  if(err) console.error(err);
});

var car = require('./src/resource/car');
var router = new (require('./lib/route')).Router(db);

//serve the index file
router.get('/', function(req, res) {
  fs.readFile('public/index.html', function(err, body){
    res.end(body);
  });
});

router.get('/app.js', function(req, res) {
  fs.readFile('public/app.js', function(err, body){
    res.end(body);
  });
});

//handling the post request 
router.post('/', function(req, res){
    car.create(req, res, db);
    fs.readFile('public/index.html', function(err, body){
    if(err){console.log(err);}
        res.setHeader('Content-Type', 'text/html');
        res.end(body);
    }); 
});

router.get('/public/css/index.css', function(req, res) {
  fs.readFile('public/css/index.css', function(err, body){
    res.setHeader('Content-Type', 'text/css');
    res.end(body);
  });
});

//serving image
router.get('/public/images/:filename',function(req, res){
    fs.readFile('public/images/' + req.params.filename, function(err, body){
      res.setHeader('Content-Type', 'image/*');
      res.end(body);
    });
});

//handling upload
router.get('/public/upload.html', function(req, res) {
  fs.readFile('public/upload.html', function(err, body){
    res.setHeader('Content-Type', 'text/html');
    res.end(body);
  });
});

var car = require('./src/resource/car');

router.resource('/cars', car); //New routing

var migrate = require('./lib/migrate');
migrate(db, 'migrations', function(err){

  var server = new http.Server(function(req, res) {
    router.route(req, res);
  });
  server.listen(PORT, function(){
    console.log("listening on port " + PORT);
  });


});