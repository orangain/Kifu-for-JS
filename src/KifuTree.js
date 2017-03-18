import React from "react";
import {pad} from "./util.js"

export default class KifuTree extends React.Component {
    render(){
        const kifuTreeNode = this.props.kifuTreeNode;
        if (!kifuTreeNode) {
            return false;
        }

        return (
            <li>{kifuTreeNode.readableKifu}
                <ul>
                    {kifuTreeNode.children.map((childNode, i) => <KifuTree key={childNode.readableKifu} kifuTreeNode={childNode}/>)}
                </ul>
            </li>);
    }
}
