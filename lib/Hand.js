"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PieceHandGroup = require("./PieceHandGroup.js");

var _PieceHandGroup2 = _interopRequireDefault(_PieceHandGroup);

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hand = function (_React$Component) {
    _inherits(Hand, _React$Component);

    function Hand() {
        _classCallCheck(this, Hand);

        return _possibleConstructorReturn(this, (Hand.__proto__ || Object.getPrototypeOf(Hand)).apply(this, arguments));
    }

    _createClass(Hand, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var kinds = ["FU", "KY", "KE", "GI", "KI", "KA", "HI"];
            var virtualColor = this.props.reversed ? 1 - this.props.color : this.props.color;
            return _react2.default.createElement(
                "div",
                { className: "mochi mochi" + this.props.color },
                _react2.default.createElement(
                    "div",
                    { className: "tebanname" },
                    (0, _util.colorToMark)(this.props.color) + (this.props.playerName || "")
                ),
                _react2.default.createElement(
                    "div",
                    { className: "mochimain" },
                    (virtualColor == 0 ? kinds.reverse() : kinds).map(function (kind) {
                        return _react2.default.createElement(_PieceHandGroup2.default, { key: kind, value: _this2.props.data[kind], data: { kind: kind, color: _this2.props.color }, ImageDirectoryPath: _this2.props.ImageDirectoryPath, onInputMove: _this2.props.onInputMove, reversed: _this2.props.reversed });
                    })
                )
            );
        }
    }]);

    return Hand;
}(_react2.default.Component);

exports.default = Hand;
module.exports = exports['default'];