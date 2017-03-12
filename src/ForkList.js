import React from "react"

export default class ForkList extends React.Component {
    render(){
        // 分岐
        var forks = this.props.forks;
        var nowMove = this.props.nowMove;
        return (
            <ul className="lines" onClick={e => {
              if (e.target.tagName != 'BUTTON') { return; }
              var num = e.target.dataset.num;
              this.props.onChange(num)}}>
                {[<li key={nowMove}><button data-num="top">{nowMove}</button></li>].concat(
                 forks.map((fork, i) => <li key={fork}><button data-num={i}>{fork}</button></li>))}
            </ul>
          /*
            <select className="forklist" value="top" onChange={e => {
				this.props.onChange(e.target.value);
			}} ref="select" disabled={forks.length==0}>
                {forks.length>0
                    ? [<option key={this.props.nowMove} value="top">{this.props.nowMove}</option>].concat(
                        forks.map((fork, i) => <option key={fork} value={i}>{fork}</option>))
                    : <option value="top">変化なし</option>}
            </select>
            */
        );
    }
}
