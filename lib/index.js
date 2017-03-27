"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Board = require('./Board');
var ForkList = require('./ForkList');
var Hand = require('./Hand');
var Kifu = require('./Kifu');
var KifuList = require('./KifuList');
var Piece = require('./Piece');
var PieceHand = require('./PieceHand');
var PieceHandGroup = require('./PieceHandGroup');

exports.default = {
    Board: Board,
    ForkList: ForkList,
    Hand: Hand,
    Kifu: Kifu,
    KifuList: KifuList,
    Piece: Piece,
    PieceHand: PieceHand,
    PieceHandGroup: PieceHandGroup,
};
module.exports = exports['default'];