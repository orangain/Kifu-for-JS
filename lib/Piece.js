"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require("react-dnd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Piece = (_dec = (0, _reactDnd.DragSource)("piece", {
    beginDrag: function beginDrag(props, monitor, component) {
        return { x: props.x, y: props.y };
    },
    endDrag: function endDrag(props, monitor, component) {
        props.onInputMove({ from: monitor.getItem(), to: monitor.getDropResult() });
    }
}, function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}), _dec2 = (0, _reactDnd.DropTarget)(["piece", "piecehand"], {
    drop: function drop(props, monitor, component) {
        return { x: props.x, y: props.y };
    }
}, function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(Piece, _React$Component);

    function Piece() {
        _classCallCheck(this, Piece);

        return _possibleConstructorReturn(this, (Piece.__proto__ || Object.getPrototypeOf(Piece)).apply(this, arguments));
    }

    _createClass(Piece, [{
        key: "render",
        value: function render() {
            var color = this.props.data.color;
            return _react2.default.createElement(
                "td",
                { className: this.props.lastMove && equalsPos(this.props.lastMove.to, this.props) ? "lastto" : "" },
                this.props.connectDropTarget(this.props.connectDragSource(_react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement("img", { src: this.getPieceImage(this.props.data.kind, this.props.reversed ? 1 - color : color),
                        style: { visibility: this.props.isDragging ? "hidden" : "" } })
                )))
            );
        }
    }, {
        key: "getPieceImage",
        value: function getPieceImage(kind, color) {
            return this.props.ImageDirectoryPath + "/" + (!kind ? "blank" : color + kind) + ".png";
        }
    }]);

    return Piece;
}(_react2.default.Component)) || _class) || _class);
exports.default = Piece;


function equalsPos(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
}
module.exports = exports['default'];