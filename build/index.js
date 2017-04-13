'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _I18n = require('./lib/I18n');

Object.defineProperty(exports, 'I18n', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_I18n).default;
  }
});

var _Translate = require('./lib/Translate');

Object.defineProperty(exports, 'Translate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Translate).default;
  }
});

var _TranslateInput = require('./lib/TranslateInput');

Object.defineProperty(exports, 'TranslateInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TranslateInput).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }