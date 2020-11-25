"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _marked = /*#__PURE__*/_regenerator["default"].mark(a);

function a() {
  return _regenerator["default"].wrap(function a$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = console;
          _context.next = 3;
          return "first";

        case 3:
          _context.t1 = _context.sent;

          _context.t0.log.call(_context.t0, ">> in generator: ", _context.t1);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var gen = a();
console.log(">> generator test: ", gen.next());
gen.next("start");