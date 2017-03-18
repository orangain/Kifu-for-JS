import React from "react";

export default class KifuTreeNode extends React.Component {
    render(){
        const kifuTreeNode = this.props.kifuTreeNode;
        return (
            <li>
                <div className="kifu-tree-node">
                    <span className={kifuTreeNode.isCurrent ? "current" : ""}
                        data-path={JSON.stringify(kifuTreeNode.path)}>{kifuTreeNode.readableKifu}</span>
                    <span className="controls">
                        <span>↑</span><span>↓</span><span>×</span>
                    </span>
                </div>
                <ul>
                    {kifuTreeNode.children.map((childNode, i) => <KifuTreeNode key={childNode.readableKifu} kifuTreeNode={childNode}/>)}
                </ul>
            </li>);
    }
}
