import React from "react";
import JKFPlayer from "json-kifu-format";
import {DragDropContext, DropTarget, DragSource} from "react-dnd";
import HTML5Backend, {NativeTypes} from "react-dnd-html5-backend";

import Board from "./Board.js";
import ForkList from "./ForkList.js";
import KifuList from "./KifuList.js";
import KifuTree from "./KifuTree.js";
import Hand from "./Hand.js";
import {version, loadFile} from "./util.js"

@DragDropContext(HTML5Backend)
@DropTarget(NativeTypes.FILE, {
    drop(props, monitor, component){
        if(monitor.getItem().files[0]){
            loadFile(monitor.getItem().files[0], (data, name) => {
                try{
                    component.setState({player: JKFPlayer.parse(data, name)});
                }catch(e){
                    component.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n"+data);
                }
            });
        }
    },
}, (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
})
export default class Kifu extends React.Component {
    constructor(props){
        super(props);
        this.state = {player: new JKFPlayer({header: {}, moves: [{}]}), reversed: false};

        this.onClickDl = this.onClickDl.bind(this);
        this.clickDlAvailable = this.clickDlAvailable.bind(this);
        this.onClickReverse = this.onClickReverse.bind(this);
        this.onClickCredit = this.onClickCredit.bind(this);
        this.onChangeKifuList = this.onChangeKifuList.bind(this);
        this.onChangeForkList = this.onChangeForkList.bind(this);
        this.onInputMove = this.onInputMove.bind(this);
    }
    componentDidMount(){
        if(this.props.callback) {
            this.props.callback((data, filename) => {
                try {
                    this.setState({
                        player: JKFPlayer.parse(data, filename),
                        filename: filename
                    })
                }catch(e){
                    this.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n"+data);
                }
                this.updateKifuTree();
                this.setState(this.state);
            });
        } else {
            try{
                this.setState({
                    player: JKFPlayer.parse(this.props.kifu)
                });
            }catch(e){
                this.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n"+this.props.kifu);
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.kifu!=nextProps.kifu){
            try{
                JKFPlayer.log("reload");
                var tesuu = this.state.player.tesuu == this.state.player.getMaxTesuu() ? Infinity : this.state.player.tesuu;
                var player = JKFPlayer.parse(nextProps.kifu);
                player.goto(tesuu);
                this.setState({
                    player: player
                });
            }catch(e){
                this.logError("棋譜形式エラー: この棋譜ファイルを @na2hiro までお寄せいただければ対応します．\n=== 棋譜 ===\n"+this.props.kifu);
            }
        }
    }
    logError(errs){
        var move = this.state.player.kifu.moves[0];
        if(move.comments){
            move.comments = errs.split("\n").concat(move.comments);
        }else{
            move.comments = errs.split("\n");
        }
        this.setState(this.state);
    }
    reload(){
        if(this.props.callback){
            this.props.callback((data, filename) => {
                JKFPlayer.log("reload");
                var tesuu = this.state.player.tesuu == this.state.player.getMaxTesuu() ? Infinity : this.state.player.tesuu;
                var player = JKFPlayer.parse(data, filename);
                player.goto(tesuu);
                this.setState({
                    player: player,
                    filename: filename
                });
            });
        }
    }
    onClickDl(){
        const jkfString = JSON.stringify(this.state.player.kifu, null, '  ');
        const jkfBlob = new Blob([jkfString], {"type" : "appliation/json"});
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(jkfBlob);
        let filename = 'kifu.jkf';
        if (this.state.filename) {
            const splits = this.state.filename.split('/');
            filename = splits[splits.length - 1];
        }
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        //if(this.state.filename) window.open(this.state.filename);
    }
    clickDlAvailable(){
        return this.state.filename;
    }
    onClickReverse(){
        this.setState({reversed: !this.state.reversed});
    }
    onClickCredit(){
        if(confirm("*** CREDIT ***\nKifu for JS (ver. "+version+")\n    by na2hiro\n    under the MIT License\n\n公式サイトを開きますか？")){
            window.open("https://github.com/na2hiro/Kifu-for-JS", "kifufile");
        }
    }
    onChangeKifuList(n){
        this.goto(n);
    }
    onChangeForkList(n){
        this.forkAndForward(n);
    }
    onChangeComments(commentString) {
        const comments = commentString.split('\n');
        const player = this.state.player;
        player.getMoveFormat(player.tesuu).comments = comments;
        this.setState(this.state);
    }
    onInputMove(move){
        try{
            if(!this.state.player.inputMove(move)){
                move.promote = confirm("成りますか？");
                this.state.player.inputMove(move);
            }
        }catch(e){
            // ignore
        }
        this.updateKifuTree();
        this.setState(this.state);
    }
    forkAndForward(num){
        if (num == 'top') {
            this.state.player.forward();
        } else {
            this.state.player.forkAndForward(num);
        }
        console.log(this.state.player)
        this.updateKifuTree();
        this.setState(this.state);
    }
    goto(tesuu){
        if(isNaN(tesuu)) return;
        this.state.player.goto(tesuu);
        this.updateKifuTree();
        this.setState(this.state);
    }
    go(tesuu){
        tesuu = Number(tesuu);
        if(isNaN(tesuu)) return;
        this.state.player.go(tesuu);
        this.updateKifuTree();
        this.setState(this.state);
    }
    gotoPath(path) {
        this.state.player.goto(0);
        path.forEach(num => {
            if (num == 0) {
                this.state.player.forward();
            } else {
                this.state.player.forkAndForward(num - 1);
            }
        });
        this.updateKifuTree();
        this.setState(this.state);
    }
    updateKifuTree(){
        const player = this.state.player;
        const jkf = player.kifu;
        
        const moveFormatsToForks = (moveFormats) => {
            let forks = [];
            if (moveFormats.length >= 2) {
                forks.push(moveFormats.slice(1));
            }

            if (moveFormats[1] && moveFormats[1].forks) {
                forks = forks.concat(moveFormats[1].forks);
            }
            return forks;
        };
        
        const createKifuTreeNode = (tesuu, moveFormats, path) => {
            const moveFormat = moveFormats[0];
            //console.log(tesuu, moveFormats);
            return {
                tesuu: tesuu,
                comments: moveFormat.comments,
                move: moveFormat.move,
                time: moveFormat.time,
                special: moveFormat.special,
                readableKifu: tesuu == 0 ? '開始局面' : JKFPlayer.moveToReadableKifu(moveFormat),
                path: path,
                children: moveFormatsToForks(moveFormats).map((moveFormatsOfFork, i) => createKifuTreeNode(tesuu + 1, moveFormatsOfFork, path.concat([i]))),
            };
        };
        
        const kifuTree = createKifuTreeNode(0, jkf.moves, []);

        let currentNode = kifuTree;
        for (let state of player.getReadableKifuState().slice(1, player.tesuu + 1)) {
            currentNode = currentNode.children.find(childNode => childNode.readableKifu == state.kifu);
        }
        currentNode.isCurrent = true;

        console.log(kifuTree);
        this.state.kifuTree = kifuTree;
    }
    updateJKFFromKifuTree() {
        const nodesToMoveFormats = (nodes) => {
            const primaryNode = nodes[0];

            if (!primaryNode) {
                return [];
            }

            const primaryMoveFormat = {
                comments: primaryNode.comments,
                move: primaryNode.move,
                time: primaryNode.time,
                special: primaryNode.special,
            };

            if (nodes.length >= 2) {
                primaryMoveFormat.forks = nodes.slice(1).map(childNode => nodesToMoveFormats([childNode]));
            }
            
            return [primaryMoveFormat].concat(nodesToMoveFormats(primaryNode.children));
        };

        this.state.player.kifu.moves = [this.state.player.kifu.moves[0]].concat(nodesToMoveFormats(this.state.kifuTree.children));
    }
    render(){
        var data = this.state.player.kifu.header;
        var dds = [];
        for(var key in data){
            dds.push(<dt key={"key"+key}>{key}</dt>);
            dds.push(<dd key={"val"+key}>{data[key]}</dd>);
        }
        var info = <dl>{dds}</dl>;

        var state = this.state.player.getState();

        var players = [
            this.state.player.kifu.header["先手"] || this.state.player.kifu.header["下手"],
            this.state.player.kifu.header["後手"] || this.state.player.kifu.header["上手"]
        ];

        var reversed = this.state.reversed;

        return this.props.connectDropTarget(
            <div>
            <table className="kifuforjs" style={{backgroundColor: this.props.isOver ? "silver" : ""}}>
                <tbody>
                <tr>
                    <td>
                        <div className={"inlineblock players "+(this.state.player.kifu.moves.some(function(move){return move.forks&&move.forks.length>0;})?"withfork":"")}>
                            <Hand color={reversed?0:1} data={state.hands[reversed?0:1]} playerName={players[reversed?0:1]} ImageDirectoryPath={this.props.ImageDirectoryPath} onInputMove={this.onInputMove} reversed={reversed}/>
                            <div className="mochi">
                                <KifuList onChange={this.onChangeKifuList} kifu={this.state.player.getReadableKifuState()} tesuu={this.state.player.tesuu} />
                                <ul className="lines">
                                    <li><button className="dl" onClick={this.onClickDl} disabled={!this.clickDlAvailable()}>棋譜保存</button></li>

                                    <li>
                                        <select className="autoload" onChange={(e) => {
												if(this.timerAutoload){
													clearInterval(this.timerAutoload);
												}
												var s = parseInt(e.target.value);
												if(!isNaN(s)){
													this.timerAutoload = setInterval(()=>{
														this.reload();
													}, s*1000);
												}
											}}>
                                            <option value="NaN">自動更新しない</option>
                                            <option value="30">自動更新30秒毎</option>
                                            <option value="60">自動更新1分毎</option>
                                            <option value="180">自動更新3分毎</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td style={{textAlign:"center"}}>
                        <Board board={state.board} lastMove={this.state.player.getMove()} ImageDirectoryPath={this.props.ImageDirectoryPath} onInputMove={this.onInputMove} reversed={reversed} />
                    </td>
                    <td>
                        <div className="inlineblock players">
                            <div className="mochi info">
                                {info}
                            </div>
                            <Hand color={reversed?1:0} data={state.hands[reversed?1:0]} playerName={players[reversed?1:0]} ImageDirectoryPath={this.props.ImageDirectoryPath} onInputMove={this.onInputMove} reversed={reversed}/>
                        </div>
                    </td>
                    <td>
                        <div className="mochi">
                            <ForkList onChange={this.onChangeForkList} forks={this.state.player.getReadableForkKifu()} nowMove={this.state.player.tesuu<this.state.player.getMaxTesuu() ? this.state.player.getReadableKifu(this.state.player.tesuu+1) : null} />
                        </div>
                   </td>
                </tr>
                <tr>
                    <td colSpan="3" style={{textAlign:"center"}}>
                        <ul className="inline go" style={{margin:"0 auto"}} onClick={(e)=>{
										if(e.target.tagName!="BUTTON") return;
										this.go($(e.target).data("go"));
										this.setState(this.state);
									}}>
                            <li><button data-go="-Infinity">|&lt;</button></li>
                            <li><button data-go="-10">&lt;&lt;</button></li>
                            <li><button data-go="-1">&lt;</button></li>
                            <li>
                                <input type="text" name="tesuu" size="3" ref="tesuu" value={this.state.player.tesuu} onChange={(e)=>{
											this.goto(e.target.value);
											this.setState(this.state);
										}} />
                            </li>
                            <li><button data-go="1">&gt;</button></li>
                            <li><button data-go="10">&gt;&gt;</button></li>
                            <li><button data-go="Infinity">&gt;|</button></li>
                        </ul>
                        <ul className="inline tools">
                            <li><button onClick={this.onClickReverse}>反転</button></li>
                            <li><button onClick={this.onClickCredit}>credit</button></li>
                        </ul>
                        <textarea rows="10" className="comment" onChange={(e) => { this.onChangeComments(e.target.value); }} value={this.state.player.getComments().join("\n")}></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
            <KifuTree kifuTree={this.state.kifuTree} onClick={e => {
                if (e.target.dataset.path) {
                    this.gotoPath(JSON.parse(e.target.dataset.path));
                } else if (e.target.classList.contains('up') || e.target.classList.contains('down') || e.target.classList.contains('delete')) {
                    this.updateJKFFromKifuTree();
                    this.updateKifuTree();
                    this.setState(this.state);
                }
            }} />
            </div>
        );
    }
}

