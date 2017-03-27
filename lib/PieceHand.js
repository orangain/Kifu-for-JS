"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require("react-dnd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieceHand = (_dec = (0, _reactDnd.DragSource)("piecehand", {
    beginDrag: function beginDrag(props, monitor, component) {
        return { piece: props.data.kind, color: props.data.color };
    },
    endDrag: function endDrag(props, monitor, component) {
        props.onInputMove({ piece: monitor.getItem().piece, color: monitor.getItem().color, to: monitor.getDropResult() });
    }
}, function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}), _dec(_class = function (_React$Component) {
    _inherits(PieceHand, _React$Component);

    function PieceHand() {
        _classCallCheck(this, PieceHand);

        return _possibleConstructorReturn(this, (PieceHand.__proto__ || Object.getPrototypeOf(PieceHand)).apply(this, arguments));
    }

    _createClass(PieceHand, [{
        key: "render",
        value: function render() {
            var virtualColor = this.props.reversed ? 1 - this.props.data.color : this.props.data.color;
            var style = this.props.position == null ? {} : { top: 0, left: this.props.position, position: "absolute", zIndex: 100 - this.props.index };
            return this.props.connectDragSource(_react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("img", { src: this.getPieceImage(this.props.data.kind, virtualColor),
                    style: style })
            ));
        }
    }, {
        key: "getPieceImage",
        value: function getPieceImage(kind, color) {
            return this.props.ImageDirectoryPath + "/" + (!kind ? "blank" : color + kind) + ".png";
        }
    }]);

    return PieceHand;
}(_react2.default.Component)) || _class);
exports.default = PieceHand;
module.exports = exports['default'];