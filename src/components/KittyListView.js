import React from 'react';
import './KittyListView.css'
import KittyView from './KittyView'
import { Container, Row, Col } from 'react-bootstrap'
import ItemStoreView from './ItemStoreView';

class KittyListView extends React.Component {

  
    constructor(props) {
      let kitty = {}
      kitty.image = "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1673366.svg"
      kitty.tokenId = "123292334"

      let nextKitty = {}
      nextKitty.image = "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1673366.svg"
      nextKitty.tokenId = "123123123"

      let kitties = []
      kitties.push(kitty)
      kitties.push(nextKitty)

      super(props);
      this.state = {kitties: kitties}
      this.passValue = this.passValue.bind(this)
      this.onStoreClose = this.onStoreClose.bind(this)
    }

    componentDidMount() {
    }
    
    passValue(kitty) {
      this.setState({selected: kitty})
    }

    onStoreClose() {
      this.setState({selected: null})
    }

    render() {
      let kitties = this.state.kitties ? this.state.kitties : []
      return (
        <Container fluid>
          {this.state.selected ? <ItemStoreView kitty={this.state.selected} onClose={this.onStoreClose}/> : ""}
        <Row>
          {kitties.map((kitty, i) => {
                return (
                  <Col className="colSpacing" s={6} md={4} lg={3} xl={2} key={i}>
                    <div onClick={() => this.passValue(kitty)} className="kittyListWindow">
                      <KittyView kitty={kitty}/>
                    </div>
                    <div> NFT ID: {kitty.tokenId}</div>
                  </Col>
                )
          })}
        </Row>
        </Container>
     );
    }
}
export default KittyListView;