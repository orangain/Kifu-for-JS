"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece = require("./Piece.js");

var _Piece2 = _interopRequireDefault(_Piece);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jsonKifuFormat = require("json-kifu-format");

var _jsonKifuFormat2 = _interopRequireDefault(_jsonKifuFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_React$Component) {
    _inherits(Board, _React$Component);

    function Board() {
        _classCallCheck(this, Board);

        return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
    }

    _createClass(Board, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var nineY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var nineX = nineY.slice().reverse();
            return _react2.default.createElement(
                "table",
                { className: "ban" },
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        nineX.map(function (logicalX) {
                            var x = _this2.props.reversed ? 10 - logicalX : logicalX;
                            return _react2.default.createElement(
                                "th",
                                { key: x },
                                x
                            );
                        })
                    ),
                    nineY.map(function (logicalY) {
                        var y = _this2.props.reversed ? 10 - logicalY : logicalY;
                        return _react2.default.createElement(
                            "tr",
                            { key: y },
                            nineX.map(function (logicalX) {
                                var x = _this2.props.reversed ? 10 - logicalX : logicalX;
                                return _react2.default.createElement(_Piece2.default, { key: x, data: _this2.props.board[x - 1][y - 1], x: x, y: y, lastMove: _this2.props.lastMove, ImageDirectoryPath: _this2.props.ImageDirectoryPath, onInputMove: _this2.props.onInputMove, reversed: _this2.props.reversed });
                            }),
                            _react2.default.createElement(
                                "th",
                                null,
                                _jsonKifuFormat2.default.numToKan(y)
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Board;
}(_react2.default.Component);

exports.default = Board;
module.exports = exports['default'];