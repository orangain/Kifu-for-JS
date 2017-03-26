import React from "react";
import KifuTreeNode from "./KifuTreeNode.js"

export default class KifuTree extends React.Component {
    render(){
        if (!this.props.kifuTree) {
            return (<div>Waiting tree</div>);
        }

        return (
            <ul className="kifu-tree" onClick={this.props.onClick}>
                <KifuTreeNode kifuTreeNode={this.props.kifuTree} />
            </ul>
        );
    }
}
