"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PieceHand = require("./PieceHand.js");

var _PieceHand2 = _interopRequireDefault(_PieceHand);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieceHandGroup = function (_React$Component) {
    _inherits(PieceHandGroup, _React$Component);

    function PieceHandGroup() {
        _classCallCheck(this, PieceHandGroup);

        return _possibleConstructorReturn(this, (PieceHandGroup.__proto__ || Object.getPrototypeOf(PieceHandGroup)).apply(this, arguments));
    }

    _createClass(PieceHandGroup, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var positioner;
            if (this.props.data.kind == "FU") {
                if (this.props.value >= 4) {
                    positioner = function positioner(i) {
                        return (120 - 32) * i / (_this2.props.value - 1);
                    };
                }
            } else {
                if (this.props.value >= 2) {
                    positioner = function positioner(i) {
                        return (60 - 32) * i / (_this2.props.value - 1);
                    };
                }
            }
            var pieces = [];
            for (var i = 0; i < this.props.value; i++) {
                pieces.push(_react2.default.createElement(_PieceHand2.default, { key: i, data: this.props.data, ImageDirectoryPath: this.props.ImageDirectoryPath, index: i,
                    onInputMove: this.props.onInputMove, position: positioner ? positioner(i) : null, reversed: this.props.reversed }));
            }
            return _react2.default.createElement(
                "span",
                { className: "mochigoma" + (this.props.value == 0 ? "" : this.props.data.kind == "FU" ? " fu" : " fu-else") },
                pieces
            );
        }
    }]);

    return PieceHandGroup;
}(_react2.default.Component);

exports.default = PieceHandGroup;
module.exports = exports['default'];