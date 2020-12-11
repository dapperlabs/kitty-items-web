import React from 'react';
import Kitty from './kitty'
import { Container, Row, Col } from 'react-bootstrap'
import ItemStore from './item-store';
import styled from "styled-components"

const Column = styled(Col)`
  margin-top: 10px;
`
const Window = styled.div`
  max-width: 100%;
  width: 260px;
  height: 300px;

  background: #707070 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 8px;
  opacity: 1;
`
class KittyList extends React.Component {

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
          {this.state.selected ? <ItemStore kitty={this.state.selected} onClose={this.onStoreClose}/> : null}
          <Row>
            {kitties.map((kitty, i) => {
              return (
                <Column s={6} md={4} lg={3} xl={2} key={i}>
                  <Window onClick={() => this.passValue(kitty)}>
                    <Kitty kitty={kitty}/>
                  </Window>
                  <div> NFT ID: {kitty.tokenId}</div>
                </Column>
              )
            })}
          </Row>
        </Container>
     );
    }
}
export default KittyList;