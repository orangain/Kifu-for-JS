import React from "react"

export default class ForkList extends React.Component {
    onClickButton(e) {
        if (e.target.tagName != 'BUTTON') {
            return;
        }
        const index = e.target.dataset.index;
        const num = index == 0 ? 'top' : index - 1;
        this.props.onChange(num);
    }
    render(){
        if (!this.props.kifuTreeNode) {
            return false;
        }
        const children = this.props.kifuTreeNode.children;
        return (
            <ul className="lines" onClick={e => {this.onClickButton(e)}}>
                {children.map((childNode, i) => <li key={i}><button data-index={i} title={childNode.comment}>{childNode.readableKifu}{childNode.comment ? ' *' : ''}</button></li>)}
            </ul>
        );
    }
}
