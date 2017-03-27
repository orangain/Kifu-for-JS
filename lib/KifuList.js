"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KifuList = function (_React$Component) {
    _inherits(KifuList, _React$Component);

    function KifuList() {
        _classCallCheck(this, KifuList);

        return _possibleConstructorReturn(this, (KifuList.__proto__ || Object.getPrototypeOf(KifuList)).apply(this, arguments));
    }

    _createClass(KifuList, [{
        key: "render",
        value: function render() {
            var options = [];
            for (var i = 0; i < this.props.kifu.length; i++) {
                var kifu = this.props.kifu[i];
                options.push(_react2.default.createElement(
                    "option",
                    { key: i, value: i },
                    (kifu.comments.length > 0 ? "*" : "\xa0") + (0, _util.pad)(i.toString(), "\xa0", 3) + " " + kifu.kifu + " " + kifu.forks.join(" ")
                ));
            }
            return _react2.default.createElement(
                "select",
                { className: "kifulist", size: "7", onChange: this.onChange.bind(this), value: this.props.tesuu },
                options
            );
        }
    }, {
        key: "onChange",
        value: function onChange(e) {
            this.props.onChange(e.target.value);
        }
    }]);

    return KifuList;
}(_react2.default.Component);

exports.default = KifuList;
module.exports = exports['default'];