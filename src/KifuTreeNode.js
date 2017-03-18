import React from "react";

export default class KifuTreeNode extends React.Component {
    render(){
        const kifuTreeNode = this.props.kifuTreeNode;
        return (
            <li>
                <div>
                    <span className={kifuTreeNode.isCurrent ? "current" : ""}
                        data-path={JSON.stringify(kifuTreeNode.path)}>{kifuTreeNode.readableKifu}</span>
                    <span className="controls" style={{display: 'none'}}>
                        <span>↑</span><span>↓</span><span>×</span>
                    </span>
                </div>
                <ul>
                    {kifuTreeNode.children.map((childNode, i) => <KifuTreeNode key={childNode.readableKifu} kifuTreeNode={childNode}/>)}
                </ul>
            </li>);
    }
}
