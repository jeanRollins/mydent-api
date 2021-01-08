"use strict";

var mysql = require('mysql');

require('custom-env').env('staging');

var util = require('util');

var conn = mysql.createConnection({
  host: "alohaweb.tk",
  user: "alohaweb_dev",
  password: "Holamundo159*",
  database: 'alohaweb_mydent'
});
var query = util.promisify(conn.query).bind(conn);

var QueryExec = function QueryExec(sql) {
  var result, response;
  return regeneratorRuntime.async(function QueryExec$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sql = sql.replace(/(\r\n\t|\n|\r\t)/, "");
          sql = sql.replace('\n', "");
          sql = sql.replace("'", " ");
          _context.next = 5;
          return regeneratorRuntime.awrap(query(sql));

        case 5:
          result = _context.sent;
          response = Object.values(JSON.parse(JSON.stringify(result)));
          return _context.abrupt("return", response);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  QueryExec: QueryExec
};