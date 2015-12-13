'use strict';

var fs = require('fs');
var http = require('http');
var url = require('url');
var Monk = require('monk');
var db = Monk('localhost/studentDirectory');
var students = db.get('students');
var companies = db.get('companies');

var server = http.createServer(handleRequest);
// start the server on port 8000
server.listen(8000, function() {
  console.log("Server is running on 8000");
});

function handleRequest(req, res) {
  // get pathname and query string from req.url
  var data = url.parse(req.url, true);
  var query = data.query;
  var pathname = data.pathname;

  if (pathname === '/students') {

    students.find({}, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write(JSON.stringify(data));
      res.end();
    });

  } else if (pathname === '/students/create') {
    // insert info dynamically from text fields

    students.insert(query, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write(JSON.stringify(data));
      res.end();
    });

  } else if (pathname === '/students/update') {

    var keyArray = Object.keys(query);
    var searchId = query[keyArray[0]];
    var changeObj = {};
    for (var i = 1; i < keyArray.length; i++) {
      changeObj[keyArray[i]] = query[keyArray[i]];
    }

    students.update({
      '_id': searchId
    }, {
      //pass in object with the updated key values
      $set: changeObj
    }, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write('Successfully updated!');
      res.end();
    });

  } else if (pathname === '/students/delete') {

    students.remove(query, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write('Student successfully deleted');
      res.end();
    });

  } else if (pathname === '/companies') {

    companies.find({}, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write(JSON.stringify(data));
      res.end();
    });

  } else if (pathname === '/companies/create') {
    // insert info dynamically from text fields

    companies.insert(query, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write(JSON.stringify(data));
      res.end();
    });

  } else if (pathname === '/companies/update') {

    var keyArray = Object.keys(query);
    var searchId = query[keyArray[0]];
    var changeObj = {};
    for (var i = 1; i < keyArray.length; i++) {
      changeObj[keyArray[i]] = query[keyArray[i]];
    }

    companies.update({
      '_id': searchId
    }, {
      //pass in object with the updated key values
      $set: changeObj
    }, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write('Successfully updated!');
      res.end();
    });

  } else if (pathname === '/companies/delete') {

    companies.remove(query, function(err, data) {
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write('Company successfully deleted');
      res.end();
    });

  } else if (pathname === '/language') {
    // Have a route for each programming language that shows the students and
    // companies who match the programming language. This route should dynamically
    // take the language to allow any possibilities added in the future.
        // ex: "/language?lang=javascript"

    var searchLang = query.lang;

    students.find({
      'lang': searchLang
    }, function (err, data){
      if (err) {
        throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write(JSON.stringify(data));
    });

    companies.find({
      'language': searchLang
    }, function (err, data){
      if (err) {
        throw err;
      }
      res.write(JSON.stringify(data));
      res.end();
    });

  } else {
    respondError(req, res);
  }
}

function respondError(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 404;
  res.write('<h1>Error 404: File cannot be found</h1>');
  res.end();
}
