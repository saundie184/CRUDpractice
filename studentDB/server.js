'use strict';

var fs = require('fs');
var http = require('http');
var url = require('url');
// var querystring = require('querystring');

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
  // res.write(JSON.stringify(data) + '\n');
  // res.write(queryObj + '\n');
  // res.write(pathnameObj);
  // res.end();


  // var queryObj = JSON.stringify(urlObj.query);
  if (req.url === '/students') {
    students.find({}, function(err, data) {
      if (err) throw err;
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write(JSON.stringify(data));
      res.end();
    });
  } else if (pathname === '/students/create') {
    // insert info dynamically from text fields
    // what we are parsing
    // /create?firstname=Ian&lastname=Smith&favLang=javascript

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
    // console.log(query);
    var keyArray = Object.keys(query);
    var searchId = query[keyArray[0]];
    // console.log(searchId);
    var changeObj = {};
    for (var i = 1; i < keyArray.length; i++) {
      changeObj[keyArray[i]] = query[keyArray[i]];
    }
    // console.log(changeObj);

    students.update({
      '_id': searchId
    }, {
      //pass in object with the updated key values
      $set: changeObj
    }, function(err, data) {
      if (err) throw err;
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
  } else if (req.url === '/companies') {
    companies.find({}, function(err, data) {
      if (err) throw err;
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.write(JSON.stringify(data));
      res.end();
    });
  } else if (pathname === '/companies/create') {
    // insert info dynamically from text fields
    // what we are parsing
    // /create?firstname=Ian&lastname=Smith&favLang=javascript

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
    // console.log(query);
    var keyArray = Object.keys(query);
    var searchId = query[keyArray[0]];
    // console.log(searchId);
    var changeObj = {};
    for (var i = 1; i < keyArray.length; i++) {
      changeObj[keyArray[i]] = query[keyArray[i]];
    }
    // console.log(changeObj);

    companies.update({
      '_id': searchId
    }, {
      //pass in object with the updated key values
      $set: changeObj
    }, function(err, data) {
      if (err) throw err;
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
  } else {
    respondError(req, res);
  }
}

function respondError(req, res) {
  res.statusCode = 404;
  res.write('Error 404; File cannot be found');
  res.end();
}
