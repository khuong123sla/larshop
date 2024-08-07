/******/ (() => { // webpackBootstrap
/*!***********************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/change-product-swatches.js ***!
  \***********************************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ChangeProductSwatches = /*#__PURE__*/function () {
  function ChangeProductSwatches() {
    _classCallCheck(this, ChangeProductSwatches);
    this.xhr = null;
    this.handleEvents();
  }
  return _createClass(ChangeProductSwatches, [{
    key: "handleEvents",
    value: function handleEvents() {
      var _self = this;
      var $body = $('body');
      $body.on('click', '.product-attributes .visual-swatch label, .product-attributes .text-swatch label', function (event) {
        event.preventDefault();
        var $radio = $(event.currentTarget).find('input[type=radio]');
        if ($radio.is(':checked')) {
          return false;
        }
        $radio.prop('checked', true);
        if ($(event.currentTarget).closest('.visual-swatch').find('input[type=radio]:checked').length < 1) {
          $radio.prop('checked', true);
        }
        $radio.trigger('change');
      });
      $body.off('change').on('change', '.product-attributes input, .product-attributes select', function (event) {
        var selectedAttributeSets = 0;
        $(event.currentTarget).closest('.product-attributes').find('.attribute-swatches-wrapper').each(function (index, el) {
          var $current = $(el);
          var attribute;
          if ($current.data('type') === 'dropdown') {
            attribute = $current.find('select').val();
          } else {
            attribute = $current.find('input[type=radio]:checked').val();
          }
          if (attribute) {
            selectedAttributeSets++;
          }
        });
        _self.getProductVariation($(event.currentTarget).closest('.product-attributes'));
      });
    }
  }, {
    key: "getProductVariation",
    value: function getProductVariation($productAttributes) {
      var _self = this;
      var attributes = [];

      /**
       * Break current request
       */
      if (_self.xhr) {
        _self.xhr.abort();
        _self.xhr = null;
      }

      /**
       * Get attributes
       */
      $productAttributes.find('.attribute-swatches-wrapper').each(function (index, el) {
        var $current = $(el);
        var attribute;
        if ($current.data('type') === 'dropdown') {
          attribute = $current.find('select').val();
        } else {
          attribute = $current.find('input[type=radio]:checked').val();
        }
        if (attribute) {
          attributes.push(attribute);
        }
      });
      if (attributes.length) {
        _self.xhr = $.ajax({
          url: $productAttributes.data('target'),
          type: 'GET',
          data: {
            attributes: attributes
          },
          beforeSend: function beforeSend() {
            if (window.onBeforeChangeSwatches && typeof window.onBeforeChangeSwatches === 'function') {
              window.onBeforeChangeSwatches(attributes);
            }
          },
          success: function success(data) {
            if (window.onChangeSwatchesSuccess && typeof window.onChangeSwatchesSuccess === 'function') {
              window.onChangeSwatchesSuccess(data);
            }
          },
          complete: function complete(data) {
            if (window.onChangeSwatchesComplete && typeof window.onChangeSwatchesComplete === 'function') {
              window.onChangeSwatchesComplete(data);
            }
          },
          error: function error(data) {
            if (window.onChangeSwatchesError && typeof window.onChangeSwatchesError === 'function') {
              window.onChangeSwatchesError(data);
            }
          }
        });
      } else {
        if (window.onBeforeChangeSwatches && typeof window.onBeforeChangeSwatches === 'function') {
          window.onBeforeChangeSwatches({
            attributes: attributes
          });
        }
        if (window.onChangeSwatchesSuccess && typeof window.onChangeSwatchesSuccess === 'function') {
          window.onChangeSwatchesSuccess(null);
        }
        if (window.onChangeSwatchesComplete && typeof window.onChangeSwatchesComplete === 'function') {
          window.onChangeSwatchesComplete(null);
        }
        if (window.onChangeSwatchesError && typeof window.onChangeSwatchesError === 'function') {
          window.onChangeSwatchesError(null);
        }
      }
    }
  }]);
}();
$(document).ready(function () {
  new ChangeProductSwatches();
});
/******/ })()
;