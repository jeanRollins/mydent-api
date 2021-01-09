"use strict";

var _require = require('../libs/Commons'),
    generateTokenAccess = _require.generateTokenAccess;

var _require2 = require('../libs/database'),
    QueryExec = _require2.QueryExec;

var _require3 = require('./Model'),
    GetLastId = _require3.GetLastId;

var AddDicom = function AddDicom(rutUser, rutPatient, url, title, description) {
  var token, query, result, lastId;
  return regeneratorRuntime.async(function AddDicom$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(generateTokenAccess());

        case 2:
          token = _context.sent;
          query = " INSERT INTO dicom \n                    (rut_usuario, rut_paciente, url, date, titulo, descripcion, token) \n                    VALUES \n                    ( '".concat(rutUser, "', '").concat(rutPatient, "', '").concat(url, "', now() ,  '").concat(title, "', '").concat(description, "', '").concat(token, "' )");
          _context.next = 6;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 6:
          result = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(GetLastId());

        case 9:
          lastId = _context.sent;
          return _context.abrupt("return", lastId[0].lastId);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

var GetFileByPatient = function GetFileByPatient(rutUser, rutPatient) {
  var query, result;
  return regeneratorRuntime.async(function GetFileByPatient$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = " \n                    SELECT  id , rut_usuario, rut_paciente, url, titulo, descripcion, token ,\n                    CONCAT( DATE_FORMAT( date, '%d-%m-%Y' ) , ' ' , DATE_FORMAT( date, '%H:%i:%s' ) ) as created \n                    FROM dicom \n                    WHERE rut_usuario = '".concat(rutUser, "' \n                    AND  rut_paciente = '").concat(rutPatient, "'");
          _context2.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var DeleteFileDicom = function DeleteFileDicom(id) {
  var query, result;
  return regeneratorRuntime.async(function DeleteFileDicom$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = " DELETE FROM dicom WHERE id = ".concat(id);
          _context3.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  AddDicom: AddDicom,
  GetFileByPatient: GetFileByPatient,
  DeleteFileDicom: DeleteFileDicom
};