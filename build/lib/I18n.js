'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formatMissingTranslation = require('./formatMissingTranslation');

var _formatMissingTranslation2 = _interopRequireDefault(_formatMissingTranslation);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleMissingTranslation = _formatMissingTranslation2.default;

exports.default = {
  _localeKey: 'en',
  _translationsObject: {},
  _getTranslations: null,
  _getLocale: null,
  _handleMissingTranslation: handleMissingTranslation,

  get _translations() {
    return this._getTranslations ? this._getTranslations() : this._translationsObject;
  },

  set _translations(translations) {
    this._translationsObject = translations;
  },

  get _locale() {
    return this._getLocale ? this._getLocale() : this._localeKey;
  },

  set _locale(locale) {
    this._localeKey = locale;
  },

  setLocale: function setLocale(locale) {
    var rerenderComponents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    this._locale = locale;
    if (rerenderComponents) {
      this.forceComponentsUpdate();
    }
  },
  setTranslations: function setTranslations(translations) {
    var rerenderComponents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    this._translations = translations;
    if (rerenderComponents) {
      this.forceComponentsUpdate();
    }
  },


  /**
   * @deprecated
   */
  loadTranslations: function loadTranslations(translations) {
    this.setTranslations(translations);
  },
  setTranslationsGetter: function setTranslationsGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Translations getter must be a function');
    }
    this._getTranslations = fn;
  },
  setLocaleGetter: function setLocaleGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Locale getter must be a function');
    }
    this._getLocale = fn;
  },
  setHandleMissingTranslation: function setHandleMissingTranslation(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Handle missing translation must be a function');
    }
    this._handleMissingTranslation = fn;
  },
  t: function t(key) {
    var replacements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this._translate(key, replacements);
  },
  _replace: function _replace(translation, replacements) {
    var _this = this;

    var replaced = translation;
    if (typeof translation === 'string') {
      Object.keys(replacements).forEach(function (replacement) {
        replaced = replaced.split('%{' + replacement + '}').join(replacements[replacement]);
      });
      return replaced;
    }
    Object.keys(replaced).forEach(function (translationKey) {
      replaced[translationKey] = _this._replace(replaced[translationKey], replacements);
    });
    return replaced;
  },
  _translate: function _translate(key) {
    var replacements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var translation = '';
    try {
      var translationLocale = this._translations[this._locale] ? this._locale : this._locale.split('-')[0];
      translation = this._fetchTranslation(this._translations, translationLocale + '.' + key, replacements.count);
    } catch (err) {
      return this._handleMissingTranslation(key, replacements);
    }
    return this._replace(translation, replacements);
  },
  _fetchTranslation: function _fetchTranslation(translations, key) {
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var _index = key.indexOf('.');
    if (typeof translations === 'undefined') {
      throw new Error('not found');
    }
    if (_index > -1) {
      return this._fetchTranslation(translations[key.substring(0, _index)], key.substr(_index + 1), count);
    }
    if (count !== null) {
      if (translations[key + '_' + count]) {
        // when key = 'items_3' if count is 3
        return translations[key + '_' + count];
      }
      if (count !== 1 && translations[key + '_plural']) {
        // when count is not simply singular, return _plural
        return translations[key + '_plural'];
      }
    }
    if (translations[key]) {
      return translations[key];
    }
    throw new Error('not found');
  },
  forceComponentsUpdate: function forceComponentsUpdate() {
    _Base2.default.rerenderAll();
  }
};