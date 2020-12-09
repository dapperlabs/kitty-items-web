import React from 'react';
import './KittyView.css'

class KittyView extends React.Component {

  
    constructor(props) {
      super(props);
      let kitty = "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1673366.svg"
      this.state = {kitty: kitty}
    }

    componentDidMount() {
    }
    

    render() {
      let items = this.props.items ? this.props.items : []
      let kitty = this.props.kitty ? this.props.kitty.image : ""
      return (

          <div className="kittyContainer">
            {items.map(function(item, i){
              return <img src={item} className="item" key={i}/>
            })}
            <img className="kitty" src={kitty}/>
          </div>     
     );
    }
}
export default KittyView;