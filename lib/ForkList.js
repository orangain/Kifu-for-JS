"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForkList = function (_React$Component) {
    _inherits(ForkList, _React$Component);

    function ForkList() {
        _classCallCheck(this, ForkList);

        return _possibleConstructorReturn(this, (ForkList.__proto__ || Object.getPrototypeOf(ForkList)).apply(this, arguments));
    }

    _createClass(ForkList, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            // 分岐
            var forks = this.props.forks;
            return _react2.default.createElement(
                "select",
                { className: "forklist", value: "top", onChange: function onChange(e) {
                        _this2.props.onChange(e.target.value);
                    }, ref: "select", disabled: forks.length == 0 },
                forks.length > 0 ? [_react2.default.createElement(
                    "option",
                    { key: this.props.nowMove, value: "top" },
                    this.props.nowMove
                )].concat(forks.map(function (fork, i) {
                    return _react2.default.createElement(
                        "option",
                        { key: fork, value: i },
                        fork
                    );
                })) : _react2.default.createElement(
                    "option",
                    { value: "top" },
                    "\u5909\u5316\u306A\u3057"
                )
            );
        }
    }]);

    return ForkList;
}(_react2.default.Component);

exports.default = ForkList;
module.exports = exports['default'];