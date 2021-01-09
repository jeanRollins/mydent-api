"use strict";

var _require = require("../models/Dicom"),
    AddDicom = _require.AddDicom,
    GetFileByPatient = _require.GetFileByPatient,
    DeleteFileDicom = _require.DeleteFileDicom,
    GetDicomDataByPatient = _require.GetDicomDataByPatient;

var AddDicomFile = function AddDicomFile(req, res) {
  var response, _req$body, rutUser, rutPatient, url, title, description, responseAdd;

  return regeneratorRuntime.async(function AddDicomFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          response = {
            message: 'ok',
            action: true
          };
          _context.prev = 1;
          _req$body = req.body, rutUser = _req$body.rutUser, rutPatient = _req$body.rutPatient, url = _req$body.url, title = _req$body.title, description = _req$body.description;

          if (!(!rutUser || rutUser === undefined)) {
            _context.next = 8;
            break;
          }

          response.message = 'rutUser required.';
          response.action = false;
          res.send(response);
          return _context.abrupt("return", false);

        case 8:
          if (!(!rutPatient || rutPatient === undefined)) {
            _context.next = 13;
            break;
          }

          response.message = 'rutPatient required.';
          response.action = false;
          res.send(response);
          return _context.abrupt("return", false);

        case 13:
          if (!(!url || url === undefined)) {
            _context.next = 18;
            break;
          }

          response.message = 'url required.';
          response.action = false;
          res.send(response);
          return _context.abrupt("return", false);

        case 18:
          if (!(!title || title === undefined)) {
            _context.next = 23;
            break;
          }

          response.message = 'title required.';
          response.action = false;
          res.send(response);
          return _context.abrupt("return", false);

        case 23:
          if (!(!description || description === undefined)) {
            _context.next = 28;
            break;
          }

          response.message = 'description required.';
          response.action = false;
          res.send(response);
          return _context.abrupt("return", false);

        case 28:
          _context.next = 30;
          return regeneratorRuntime.awrap(AddDicom(rutUser, rutPatient, url, title, description));

        case 30:
          responseAdd = _context.sent;

          if (responseAdd) {
            _context.next = 34;
            break;
          }

          res.send({
            action: false,
            message: 'Problem to save file'
          });
          return _context.abrupt("return", false);

        case 34:
          res.send(response);
          _context.next = 40;
          break;

        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](1);
          res.send({
            action: false,
            message: _context.t0
          });

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 37]]);
};

var GetFilesDicomByPatient = function GetFilesDicomByPatient(req, res) {
  var response, _req$body2, rutUser, rutPatient, filesFounded;

  return regeneratorRuntime.async(function GetFilesDicomByPatient$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          response = {
            message: 'ok',
            action: true
          };
          _context2.prev = 1;
          _req$body2 = req.body, rutUser = _req$body2.rutUser, rutPatient = _req$body2.rutPatient;

          if (!(!rutUser || rutUser === undefined)) {
            _context2.next = 8;
            break;
          }

          response.message = 'rutUser required.';
          response.action = false;
          res.send(response);
          return _context2.abrupt("return", false);

        case 8:
          if (!(!rutPatient || rutPatient === undefined)) {
            _context2.next = 13;
            break;
          }

          response.message = 'rutPatient required.';
          response.action = false;
          res.send(response);
          return _context2.abrupt("return", false);

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(GetFileByPatient(rutUser, rutPatient));

        case 15:
          filesFounded = _context2.sent;
          response.data = filesFounded;
          res.send(response);
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](1);
          res.send({
            action: false,
            message: _context2.t0,
            data: []
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 20]]);
};

var DeleteDicom = function DeleteDicom(req, res) {
  var response, id, responseDelete;
  return regeneratorRuntime.async(function DeleteDicom$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          response = {
            message: 'ok',
            action: true
          };
          _context3.prev = 1;
          id = req.body.id;

          if (!(!id || id === undefined)) {
            _context3.next = 8;
            break;
          }

          response.message = 'id required.';
          response.action = false;
          res.send(response);
          return _context3.abrupt("return", false);

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(DeleteFileDicom(id));

        case 10:
          responseDelete = _context3.sent;
          res.send(response);
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          res.send({
            action: false,
            message: _context3.t0
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

var GetFileDicom = function GetFileDicom(req, res) {
  var response, token, fileFounded;
  return regeneratorRuntime.async(function GetFileDicom$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          response = {
            message: 'ok',
            action: true
          };
          _context4.prev = 1;
          token = req.body.token;

          if (!(!token || token === undefined)) {
            _context4.next = 8;
            break;
          }

          response.message = 'token required.';
          response.action = false;
          res.send(response);
          return _context4.abrupt("return", false);

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(GetDicomDataByPatient(token));

        case 10:
          fileFounded = _context4.sent;
          response.data = fileFounded;
          res.send(response);
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](1);
          res.send({
            action: false,
            message: _context4.t0,
            data: []
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

module.exports = {
  AddDicomFile: AddDicomFile,
  GetFilesDicomByPatient: GetFilesDicomByPatient,
  DeleteDicom: DeleteDicom,
  GetFileDicom: GetFileDicom
};