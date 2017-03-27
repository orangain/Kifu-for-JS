"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jsonKifuFormat = require("json-kifu-format");

var _jsonKifuFormat2 = _interopRequireDefault(_jsonKifuFormat);

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Board = require("./Board.js");

var _Board2 = _interopRequireDefault(_Board);

var _ForkList = require("./ForkList.js");

var _ForkList2 = _interopRequireDefault(_ForkList);

var _KifuList = require("./KifuList.js");

var _KifuList2 = _interopRequireDefault(_KifuList);

var _Hand = require("./Hand.js");

var _Hand2 = _interopRequireDefault(_Hand);

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Kifu = (_dec = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default), _dec2 = (0, _reactDnd.DropTarget)(_reactDndHtml5Backend.NativeTypes.FILE, {
    drop: function drop(props, monitor, component) {
        if (monitor.getItem().files[0]) {
            (0, _util.loadFile)(monitor.getItem().files[0], function (data, name) {
                try {
                    component.setState({ player: _jsonKifuFormat2.default.parse(data, name) });
                } catch (e) {
                    component.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n" + data);
                }
            });
        }
    }
}, function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(Kifu, _React$Component);

    function Kifu(props) {
        _classCallCheck(this, Kifu);

        var _this = _possibleConstructorReturn(this, (Kifu.__proto__ || Object.getPrototypeOf(Kifu)).call(this, props));

        _this.state = { player: new _jsonKifuFormat2.default({ header: {}, moves: [{}] }), reversed: false };

        _this.onClickDl = _this.onClickDl.bind(_this);
        _this.clickDlAvailable = _this.clickDlAvailable.bind(_this);
        _this.onClickReverse = _this.onClickReverse.bind(_this);
        _this.onClickCredit = _this.onClickCredit.bind(_this);
        _this.onChangeKifuList = _this.onChangeKifuList.bind(_this);
        _this.onChangeForkList = _this.onChangeForkList.bind(_this);
        _this.onInputMove = _this.onInputMove.bind(_this);
        return _this;
    }

    _createClass(Kifu, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.callback) {
                this.props.callback(function (data, filename) {
                    try {
                        _this2.setState({
                            player: _jsonKifuFormat2.default.parse(data, filename),
                            filename: filename
                        });
                    } catch (e) {
                        _this2.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n" + data);
                    }
                });
            } else {
                try {
                    this.setState({
                        player: _jsonKifuFormat2.default.parse(this.props.kifu)
                    });
                } catch (e) {
                    this.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n" + this.props.kifu);
                }
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.kifu != nextProps.kifu) {
                try {
                    _jsonKifuFormat2.default.log("reload");
                    var tesuu = this.state.player.tesuu == this.state.player.getMaxTesuu() ? Infinity : this.state.player.tesuu;
                    var player = _jsonKifuFormat2.default.parse(nextProps.kifu);
                    player.goto(tesuu);
                    this.setState({
                        player: player
                    });
                } catch (e) {
                    this.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n" + this.props.kifu);
                }
            }
        }
    }, {
        key: "logError",
        value: function logError(errs) {
            var move = this.state.player.kifu.moves[0];
            if (move.comments) {
                move.comments = errs.split("\n").concat(move.comments);
            } else {
                move.comments = errs.split("\n");
            }
            this.setState(this.state);
        }
    }, {
        key: "reload",
        value: function reload() {
            var _this3 = this;

            if (this.props.callback) {
                this.props.callback(function (data, filename) {
                    _jsonKifuFormat2.default.log("reload");
                    var tesuu = _this3.state.player.tesuu == _this3.state.player.getMaxTesuu() ? Infinity : _this3.state.player.tesuu;
                    var player = _jsonKifuFormat2.default.parse(data, filename);
                    player.goto(tesuu);
                    _this3.setState({
                        player: player,
                        filename: filename
                    });
                });
            }
        }
    }, {
        key: "onClickDl",
        value: function onClickDl() {
            if (this.state.filename) window.open(this.state.filename);
        }
    }, {
        key: "clickDlAvailable",
        value: function clickDlAvailable() {
            return this.state.filename;
        }
    }, {
        key: "onClickReverse",
        value: function onClickReverse() {
            this.setState({ reversed: !this.state.reversed });
        }
    }, {
        key: "onClickCredit",
        value: function onClickCredit() {
            if (confirm("*** CREDIT ***\nKifu for JS (ver. " + _util.version + ")\n    by na2hiro\n    under the MIT License\n\n公式サイトを開きますか？")) {
                window.open("https://github.com/na2hiro/Kifu-for-JS", "kifufile");
            }
        }
    }, {
        key: "onChangeKifuList",
        value: function onChangeKifuList(n) {
            this.goto(n);
        }
    }, {
        key: "onChangeForkList",
        value: function onChangeForkList(n) {
            this.forkAndForward(n);
        }
    }, {
        key: "onInputMove",
        value: function onInputMove(move) {
            try {
                if (!this.state.player.inputMove(move)) {
                    move.promote = confirm("成りますか？");
                    this.state.player.inputMove(move);
                }
            } catch (e) {
                // ignore
            }
            this.setState(this.state);
        }
    }, {
        key: "forkAndForward",
        value: function forkAndForward(num) {
            this.state.player.forkAndForward(num);
            console.log(this.state.player);
            this.setState(this.state);
        }
    }, {
        key: "goto",
        value: function goto(tesuu) {
            if (isNaN(tesuu)) return;
            this.state.player.goto(tesuu);
            this.setState(this.state);
        }
    }, {
        key: "go",
        value: function go(tesuu) {
            tesuu = Number(tesuu);
            if (isNaN(tesuu)) return;
            this.state.player.go(tesuu);
            this.setState(this.state);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var data = this.state.player.kifu.header;
            var dds = [];
            for (var key in data) {
                dds.push(_react2.default.createElement(
                    "dt",
                    { key: "key" + key },
                    key
                ));
                dds.push(_react2.default.createElement(
                    "dd",
                    { key: "val" + key },
                    data[key]
                ));
            }
            var info = _react2.default.createElement(
                "dl",
                null,
                dds
            );

            var state = this.state.player.getState();

            var players = [this.state.player.kifu.header["先手"] || this.state.player.kifu.header["下手"], this.state.player.kifu.header["後手"] || this.state.player.kifu.header["上手"]];

            var reversed = this.state.reversed;

            return this.props.connectDropTarget(_react2.default.createElement(
                "table",
                { className: "kifuforjs", style: { backgroundColor: this.props.isOver ? "silver" : "" } },
                _react2.default.createElement(
                    "tbody",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                                "div",
                                { className: "inlineblock players " + (this.state.player.kifu.moves.some(function (move) {
                                        return move.forks && move.forks.length > 0;
                                    }) ? "withfork" : "") },
                                _react2.default.createElement(_Hand2.default, { color: reversed ? 0 : 1, data: state.hands[reversed ? 0 : 1], playerName: players[reversed ? 0 : 1], ImageDirectoryPath: this.props.ImageDirectoryPath, onInputMove: this.onInputMove, reversed: reversed }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "mochi" },
                                    _react2.default.createElement(_KifuList2.default, { onChange: this.onChangeKifuList, kifu: this.state.player.getReadableKifuState(), tesuu: this.state.player.tesuu }),
                                    _react2.default.createElement(
                                        "ul",
                                        { className: "lines" },
                                        _react2.default.createElement(
                                            "li",
                                            { className: "fork" },
                                            _react2.default.createElement(_ForkList2.default, { onChange: this.onChangeForkList, forks: this.state.player.getReadableForkKifu(), nowMove: this.state.player.tesuu < this.state.player.getMaxTesuu() ? this.state.player.getReadableKifu(this.state.player.tesuu + 1) : null })
                                        ),
                                        _react2.default.createElement(
                                            "li",
                                            null,
                                            _react2.default.createElement(
                                                "button",
                                                { className: "dl", onClick: this.onClickDl, disabled: !this.clickDlAvailable() },
                                                "\u68CB\u8B5C\u4FDD\u5B58"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "li",
                                            null,
                                            _react2.default.createElement(
                                                "select",
                                                { className: "autoload", onChange: function onChange(e) {
                                                        if (_this4.timerAutoload) {
                                                            clearInterval(_this4.timerAutoload);
                                                        }
                                                        var s = parseInt(e.target.value);
                                                        if (!isNaN(s)) {
                                                            _this4.timerAutoload = setInterval(function () {
                                                                _this4.reload();
                                                            }, s * 1000);
                                                        }
                                                    } },
                                                _react2.default.createElement(
                                                    "option",
                                                    { value: "NaN" },
                                                    "\u81EA\u52D5\u66F4\u65B0\u3057\u306A\u3044"
                                                ),
                                                _react2.default.createElement(
                                                    "option",
                                                    { value: "30" },
                                                    "\u81EA\u52D5\u66F4\u65B030\u79D2\u6BCE"
                                                ),
                                                _react2.default.createElement(
                                                    "option",
                                                    { value: "60" },
                                                    "\u81EA\u52D5\u66F4\u65B01\u5206\u6BCE"
                                                ),
                                                _react2.default.createElement(
                                                    "option",
                                                    { value: "180" },
                                                    "\u81EA\u52D5\u66F4\u65B03\u5206\u6BCE"
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "td",
                            { style: { textAlign: "center" } },
                            _react2.default.createElement(_Board2.default, { board: state.board, lastMove: this.state.player.getMove(), ImageDirectoryPath: this.props.ImageDirectoryPath, onInputMove: this.onInputMove, reversed: reversed })
                        ),
                        _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                                "div",
                                { className: "inlineblock players" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "mochi info" },
                                    info
                                ),
                                _react2.default.createElement(_Hand2.default, { color: reversed ? 1 : 0, data: state.hands[reversed ? 1 : 0], playerName: players[reversed ? 1 : 0], ImageDirectoryPath: this.props.ImageDirectoryPath, onInputMove: this.onInputMove, reversed: reversed })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "td",
                            { colSpan: "3", style: { textAlign: "center" } },
                            _react2.default.createElement(
                                "ul",
                                { className: "inline go", style: { margin: "0 auto" }, onClick: function onClick(e) {
                                        if (e.target.tagName != "BUTTON") return;
                                        _this4.go($(e.target).data("go"));
                                        _this4.setState(_this4.state);
                                    } },
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { "data-go": "-Infinity" },
                                        "|<"
                                    )
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { "data-go": "-10" },
                                        "<<"
                                    )
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { "data-go": "-1" },
                                        "<"
                                    )
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement("input", { type: "text", name: "tesuu", size: "3", ref: "tesuu", value: this.state.player.tesuu, onChange: function onChange(e) {
                                            _this4.goto(e.target.value);
                                            _this4.setState(_this4.state);
                                        } })
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { "data-go": "1" },
                                        ">"
                                    )
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { "data-go": "10" },
                                        ">>"
                                    )
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { "data-go": "Infinity" },
                                        ">|"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "ul",
                                { className: "inline tools" },
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { onClick: this.onClickReverse },
                                        "\u53CD\u8EE2"
                                    )
                                ),
                                _react2.default.createElement(
                                    "li",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { onClick: this.onClickCredit },
                                        "credit"
                                    )
                                )
                            ),
                            _react2.default.createElement("textarea", { rows: "10", className: "comment", disabled: true, value: this.state.player.getComments().join("\n") })
                        )
                    )
                )
            ));
        }
    }]);

    return Kifu;
}(_react2.default.Component)) || _class) || _class);
exports.default = Kifu;
module.exports = exports['default'];