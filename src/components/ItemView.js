import React from 'react';
import './ItemView.css'

class ItemView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {highlighted: false, item: props.item}
      this.onClick = this.onClick.bind(this)
    }

    onClick() {
      this.props.addOrRemoveItem(this.state.item)
      this.setState({highlighted: !this.state.highlighted})
    }

    render() {

      return (
        <div className={this.state.highlighted ? "itemWindow is-highlighted" : "itemWindow" } onClick={this.onClick}>
          {this.state.highlighted ? <div className="hightlight-indicator"/> : ""}
          <div className="itemContainer">
            {/* { this.state.item == null ?  : ""} */}
            <img className="item" src={this.state.item}/>
          </div>    
        </div>  
     );
    }
}
export default ItemView;