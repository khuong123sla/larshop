/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**************************************************************************!*\
  !*** ./platform/plugins/ecommerce/resources/assets/js/payment-method.js ***!
  \**************************************************************************/


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PaymentMethodManagement = /*#__PURE__*/function () {
  function PaymentMethodManagement() {
    _classCallCheck(this, PaymentMethodManagement);
  }
  return _createClass(PaymentMethodManagement, [{
    key: "init",
    value: function init() {
      $('.toggle-payment-item').off('click').on('click', function (event) {
        $(event.currentTarget).closest('tbody').find('.payment-content-item').toggleClass('hidden');
      });
      $('.disable-payment-item').off('click').on('click', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        $('#confirm-disable-payment-method-modal').modal('show');
        $('#confirm-disable-payment-method-button').on('click', function (event) {
          event.preventDefault();
          $(event.currentTarget).addClass('button-loading');
          $.ajax({
            type: 'POST',
            cache: false,
            url: $('div[data-disable-payment-url]').data('disable-payment-url'),
            data: {
              type: _self.closest('form').find('.payment_type').val()
            },
            success: function success(res) {
              if (!res.error) {
                _self.closest('tbody').find('.payment-name-label-group').addClass('hidden');
                _self.closest('tbody').find('.edit-payment-item-btn-trigger').addClass('hidden');
                _self.closest('tbody').find('.save-payment-item-btn-trigger').removeClass('hidden');
                _self.closest('tbody').find('.btn-text-trigger-update').addClass('hidden');
                _self.closest('tbody').find('.btn-text-trigger-save').removeClass('hidden');
                _self.addClass('hidden');
                $('#confirm-disable-payment-method-modal').modal('hide');
                Botble.showSuccess(res.message);
              } else {
                Botble.showError(res.message);
              }
              $('#confirm-disable-payment-method-button').removeClass('button-loading');
            },
            error: function error(res) {
              Botble.handleError(res);
              $('#confirm-disable-payment-method-button').removeClass('button-loading');
            }
          });
        });
      });
      $('.save-payment-item').off('click').on('click', function (event) {
        event.preventDefault();
        var _self = $(event.currentTarget);
        _self.addClass('button-loading');
        $.ajax({
          type: 'POST',
          cache: false,
          url: $('div[data-update-payment-url]').data('update-payment-url'),
          data: _self.closest('form').serialize(),
          success: function success(res) {
            if (!res.error) {
              _self.closest('tbody').find('.payment-name-label-group').removeClass('hidden');
              _self.closest('tbody').find('.method-name-label').text(_self.closest('form').find('input[name=name]').val());
              _self.closest('tbody').find('.disable-payment-item').removeClass('hidden');
              _self.closest('tbody').find('.edit-payment-item-btn-trigger').removeClass('hidden');
              _self.closest('tbody').find('.save-payment-item-btn-trigger').addClass('hidden');
              _self.closest('tbody').find('.btn-text-trigger-update').removeClass('hidden');
              _self.closest('tbody').find('.btn-text-trigger-save').addClass('hidden');
              Botble.showSuccess(res.message);
            } else {
              Botble.showError(res.message);
            }
            _self.removeClass('button-loading');
          },
          error: function error(res) {
            Botble.handleError(res);
            _self.removeClass('button-loading');
          }
        });
      });
    }
  }]);
}();
$(document).ready(function () {
  new PaymentMethodManagement().init();
});
/******/ })()
;