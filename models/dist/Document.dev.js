"use strict";

var _require = require('../libs/database'),
    QueryExec = _require.QueryExec;

var AddDocumentModel = function AddDocumentModel(document) {
  var query, result;
  return regeneratorRuntime.async(function AddDocumentModel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "INSERT INTO documentos ( url, descripcion, tipo, rut_usuario, rut_paciente, nombre, created )  VALUES (  '".concat(document.url, "' , '").concat(document.description, "', '").concat(document.type, "' , '").concat(document.rutUser, "' , '").concat(document.rutPacient, "', '").concat(document.name, "', now() ) ; ");
          _context.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context.sent;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getAllDocumentByUserAndPacient = function getAllDocumentByUserAndPacient(ruts) {
  var query, result;
  return regeneratorRuntime.async(function getAllDocumentByUserAndPacient$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = " SELECT \n                    id , url , descripcion, tipo, rut_usuario, rut_paciente, nombre, \n                    CONCAT( DATE_FORMAT( created, '%d-%m-%Y' ) , ' ' , DATE_FORMAT( created, '%H:%i:%s' ) ) as created\n                    FROM documentos \n                    WHERE rut_usuario = '".concat(ruts.rutUser, "' \n                    AND rut_paciente = '").concat(ruts.rutPacient, "'");
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

var DeleteDocument = function DeleteDocument(id) {
  var query, result;
  return regeneratorRuntime.async(function DeleteDocument$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = "DELETE FROM documentos WHERE id = ".concat(id);
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
  AddDocumentModel: AddDocumentModel,
  getAllDocumentByUserAndPacient: getAllDocumentByUserAndPacient,
  DeleteDocument: DeleteDocument
};