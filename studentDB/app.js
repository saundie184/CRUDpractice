'use strict';

var fs = require('fs');
var $ = require('jquery')(require("jsdom").jsdom().defaultView);

// module.exports.buildTable = function(filename, arr) {
//   var $tbody = $('<tbody>');
//   fs.appendFile(filename, arr, function(err) {
//     arr.forEach(function(elem){
//       $tbody.html('<tr><td>' + elem.lastName + ', ' + elem.firstName + '</td><td>' + elem.lang + '</td></tr>');
//     });
//   });
//   console.log(filename);
//   console.log(arr);
// };

module.exports.buildTable = function(arr, filename) {
  var $tbody = $('<tbody>');
  fs.appendFile(filename, arr, function() {
    arr.forEach(function(elem){
      $tbody.html('<tr><td>' + elem.lastName + ', ' + elem.firstName + '</td><td>' + elem.lang + '</td></tr>');
    });
  });
};
