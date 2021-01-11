"use strict";

var _require = require('../libs/database'),
    QueryExec = _require.QueryExec;

var _require2 = require('./Model'),
    GetLastId = _require2.GetLastId;

var AddItem = function AddItem(rut, treatment, value) {
  var query, result;
  return regeneratorRuntime.async(function AddItem$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "INSERT INTO presupuestos_tratamientos (rut_usuario, id_tratamiento, valor) VALUES ( '".concat(rut, "', ").concat(treatment, ", ").concat(value, ")");
          _context.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var DeleteItem = function DeleteItem(id) {
  var query, result;
  return regeneratorRuntime.async(function DeleteItem$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = "DELETE FROM presupuestos_tratamientos WHERE id=".concat(id);
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

var GetItems = function GetItems(rut) {
  var query, result;
  return regeneratorRuntime.async(function GetItems$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = " SELECT pt.id as id_presupuesto, pt.rut_usuario as rut, pt.id_tratamiento as id_tratamiento, pt.valor as valor, e.*, et.*  FROM presupuestos_tratamientos pt INNER JOIN especialidades_tratamiento et ON et.id = pt.id_tratamiento  INNER JOIN especialidades e ON e.id = et.id_especialidad WHERE pt.rut_usuario = '".concat(rut, "';");
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

var GetTratamientByUser = function GetTratamientByUser(rut) {
  var query, result;
  return regeneratorRuntime.async(function GetTratamientByUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          query = " SELECT \n                    pt.id as id_presupuesto, pt.valor, pt.rut_usuario, pt.id_tratamiento, \n                    et.id as id_tratamiento, et.class, et.codigo as codigo_tratamiento, et.nombre as nombre_tratamiento, et.type as tipo_tratamiento,\n                    e.id  as id_especialidad, e.name as nombre_especialidad, e.codigo as codigo_especialidad \n                    FROM presupuestos_tratamientos pt \n                    INNER JOIN  especialidades_tratamiento et ON et.id = pt.id_tratamiento\n                    INNER JOIN  especialidades e ON e.id = et.id_especialidad\n                    WHERE pt.rut_usuario = '".concat(rut, "' ");
          _context4.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var CreateBudget = function CreateBudget(rutUser, rutPatient) {
  var query, result, lastId;
  return regeneratorRuntime.async(function CreateBudget$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          query = "INSERT INTO presupuestos \n                     ( rut_paciente, rut_usuario, fecha_creacion, estado ) \n                     VALUES \n                     ( '".concat(rutPatient, "', '").concat(rutUser, "', now(), 0 )");
          _context5.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(GetLastId());

        case 6:
          lastId = _context5.sent;
          return _context5.abrupt("return", lastId[0].lastId);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var AddItemsBudget = function AddItemsBudget(idBudget, items) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, response;

  return regeneratorRuntime.async(function AddItemsBudget$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context6.prev = 3;
          _iterator = items[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context6.next = 13;
            break;
          }

          item = _step.value;
          _context6.next = 9;
          return regeneratorRuntime.awrap(CreateBudgetItem(idBudget, item.tooth, item.faceToDent, item.idTratament));

        case 9:
          response = _context6.sent;

        case 10:
          _iteratorNormalCompletion = true;
          _context6.next = 5;
          break;

        case 13:
          _context6.next = 19;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context6.t0;

        case 19:
          _context6.prev = 19;
          _context6.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context6.prev = 22;

          if (!_didIteratorError) {
            _context6.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context6.finish(22);

        case 26:
          return _context6.finish(19);

        case 27:
          return _context6.abrupt("return", true);

        case 28:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 15, 19, 27], [20,, 22, 26]]);
};

var CreateBudgetItem = function CreateBudgetItem(idBudget, tooth, faceToDent, idTratament) {
  var query, result;
  return regeneratorRuntime.async(function CreateBudgetItem$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          query = "INSERT INTO presupuestos_item \n                    (id_prespuesto, diente, cara, id_tratamiento, fecha_realizado, estado ) \n                    VALUES \n                    ( ".concat(idBudget, " , ").concat(tooth, ", '").concat(faceToDent, "', ").concat(idTratament, ", '', 1 )");
          _context7.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context7.sent;
          return _context7.abrupt("return", result);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var UpdateStateBudget = function UpdateStateBudget(idBudget, state) {
  var query, result;
  return regeneratorRuntime.async(function UpdateStateBudget$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          query = "UPDATE presupuestos SET  estado = ".concat(state, " WHERE id = ").concat(idBudget);
          _context8.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context8.sent;
          return _context8.abrupt("return", result);

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var GetItemsByPatient = function GetItemsByPatient(id, rutUser) {
  var query, result;
  return regeneratorRuntime.async(function GetItemsByPatient$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          query = "SELECT \n                    p.id as id_budget, p.rut_paciente , p.rut_usuario , CONCAT( DATE_FORMAT( p.fecha_creacion, '01-%m-%Y' ) , ' ' , DATE_FORMAT( p.fecha_creacion, '%H:%i:%s' ) ) as create_budget, p.estado as state_budget ,\n                    pi.diente as tooth, pi.id as id_item, pi.cara as face_tooth, pi.id_tratamiento as id_tratament,  CONCAT( DATE_FORMAT( pi.fecha_realizado, '01-%m-%Y' ) , ' ' , DATE_FORMAT( pi.fecha_realizado, '%H:%i:%s' ) ) as date_completed , pi.estado as state_tratament ,\n                    pt.valor as value_tratament ,\n                    CONCAT( pat.nombres , ' ' , pat.apellido_paterno, ' ', pat.apellido_materno ) as name ,  DATE_FORMAT( pat.fecha_nacimiento ,'01-%m-%Y')  as born , pat.prevision as prevision_id,\n                    pre.name as name_prevision , \n                    et.nombre as name_speciality, et.class as class_speciality, et.type as type_specialty \n                    FROM presupuestos p \n                    LEFT JOIN presupuestos_item pi \t\t  ON p.id    = pi.id_prespuesto\n                    LEFT JOIN presupuestos_tratamientos pt   ON pt.id   = pi.id_tratamiento\n                    LEFT JOIN pacientes pat \t\t\t\t  ON pat.rut = p.rut_paciente\n                    LEFT JOIN prevision pre\t\t\t\t  ON pre.id  = pat.prevision\n                    LEFT JOIN especialidades_tratamiento et  ON et.id   = pt.id_tratamiento\n                    WHERE   p.rut_usuario = '".concat(rutUser, "'\n                    AND   p.id = '").concat(id, "'");
          _context9.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context9.sent;
          return _context9.abrupt("return", result);

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var GetBudgetByPatient = function GetBudgetByPatient(rutUser, rutPatient) {
  var query, result;
  return regeneratorRuntime.async(function GetBudgetByPatient$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          query = "SELECT \n                    p.id as id_budget, p.rut_paciente , p.rut_usuario , CONCAT( DATE_FORMAT( p.fecha_creacion, '01-%m-%Y' ) , ' ' , DATE_FORMAT( p.fecha_creacion, '%H:%i:%s' ) ) as create_budget, p.estado as state_budget , \n                    CONCAT( pat.nombres , ' ' , pat.apellido_paterno, ' ', pat.apellido_materno ) as name , DATE_FORMAT( pat.fecha_nacimiento ,'01-%m-%Y') as born , pat.prevision as prevision_id, \n                    pre.name as name_prevision \n                    FROM presupuestos p \n                    INNER JOIN pacientes pat ON pat.rut = p.rut_paciente \n                    INNER JOIN prevision pre ON pre.id = pat.prevision \n                    WHERE pat.rut     = '".concat(rutPatient, "' \n                    AND p.rut_usuario = '").concat(rutUser, "'");
          _context10.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context10.sent;
          return _context10.abrupt("return", result);

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var UpdateStateBudgetItem = function UpdateStateBudgetItem(idItem, state) {
  var query, result;
  return regeneratorRuntime.async(function UpdateStateBudgetItem$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          query = "UPDATE presupuestos_item SET  estado = ".concat(state, ", fecha_realizado = now() WHERE id = ").concat(idItem);
          _context11.next = 3;
          return regeneratorRuntime.awrap(QueryExec(query));

        case 3:
          result = _context11.sent;
          return _context11.abrupt("return", result);

        case 5:
        case "end":
          return _context11.stop();
      }
    }
  });
};

module.exports = {
  AddItem: AddItem,
  DeleteItem: DeleteItem,
  GetItems: GetItems,
  GetTratamientByUser: GetTratamientByUser,
  CreateBudget: CreateBudget,
  CreateBudgetItem: CreateBudgetItem,
  AddItemsBudget: AddItemsBudget,
  UpdateStateBudget: UpdateStateBudget,
  GetItemsByPatient: GetItemsByPatient,
  GetBudgetByPatient: GetBudgetByPatient,
  UpdateStateBudgetItem: UpdateStateBudgetItem
};