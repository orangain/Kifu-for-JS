import React from "react";

export default class KifuTreeNode extends React.Component {
    moveUpFork(index){
        const node = this.props.kifuTreeNode;
        if (index == 0) {
            return; // do nothing
        }

        const childNode = node.children[index];
        node.children[index] = node.children[index - 1];
        node.children[index - 1] = childNode;
    }
    moveDownFork(index){
        const node = this.props.kifuTreeNode;
        if (index == node.children.length - 1) {
            return; // do nothing
        }

        const childNode = node.children[index];
        node.children[index] = node.children[index + 1];
        node.children[index + 1] = childNode;
    }
    removeFork(index){
        const node = this.props.kifuTreeNode;
        node.children.splice(index, 1);
    }
    render(){
        const kifuTreeNode = this.props.kifuTreeNode;
        return (
            <li>
                <div className="kifu-tree-node">
                    <span className={"readable-kifu " + (kifuTreeNode.isCurrent ? "current" : "")}
                        data-path={JSON.stringify(kifuTreeNode.path)}>{kifuTreeNode.readableKifu}</span>
                    <span className="controls">
                        <span className="up" onClick={e => {this.props.onClickUp()}}>↑</span>
                        <span className="down" onClick={e => {this.props.onClickDown()}}>↓</span>
                        <span className="delete" onClick={e => {this.props.onClickRemove()}}>×</span>
                    </span>
                </div>
                <ul>
                    {kifuTreeNode.children.map((childNode, i) =>
                        <KifuTreeNode key={childNode.readableKifu} kifuTreeNode={childNode}
                         onClickUp={e => this.moveUpFork(i)} onClickDown={e => this.moveDownFork(i)} onClickRemove={e => this.removeFork(i)}/>)}
                </ul>
            </li>);
    }
}
