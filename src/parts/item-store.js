import React from 'react';
import Item from './item'
import { Card, Container, Row, Col, Button  } from 'react-bootstrap'
import Kitty from './kitty';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components"

const Store = styled(Card)`
  width: 813px;
  height: 522px;
  background: #FFEBEB 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  padding: 20px;
`
const StoreContainer = styled(Container)`
  height: 100%;
`
const Header = styled(Row)`
  height: 50px;
`
const Window = styled(Col)`
  max-width: 338px;
  min-height: 100% !important;
  background: #707070 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 8px;
  opacity: 1;
`
const Items = styled(Col)`
  padding-left: 25px;
  padding-right: 0px;
  overflow-x: hidden;
  overflow-y: scroll;
`
class ItemStore extends React.Component {
    constructor(props) {
      super(props);
      this.state = {items: []}
      this.addOrRemoveItem = this.addOrRemoveItem.bind(this)
    }

    addOrRemoveItem (item) {
      let items = this.state.items
      items.includes(item) ? items = items.filter((element) => { return element !== item }) : items.push(item)
      this.setState({items: items})
    }

    render() {
      let kitty = this.props.kitty
      return (
        <Store>
          <StoreContainer fluid>
            <Row className="h-100">
              <Window>
                <Kitty kitty={kitty} items={this.state.items}/>
              </Window>
              <Col>
                <Header>
                  <Col>
                    Items Store
                  </Col>

                  <Col>
                    <Button variant="outline-secondary" onClick={this.props.onClose}>Cancel</Button>
                    <Button variant="outline-secondary" onClick={this.props.onClose}>Apply</Button>
                  </Col>
                </Header>
                <Row>
                  <Items>
                    <Row>
                      <Item addOrRemoveItem={this.addOrRemoveItem} item="/items/hat01.svg"/>
                      <Item addOrRemoveItem={this.addOrRemoveItem}  item="/items/hat02.svg"/>
                      <Item addOrRemoveItem={this.addOrRemoveItem}  item="/items/hat03.svg"/>
                      <Item addOrRemoveItem={this.addOrRemoveItem}  item="/items/hat04.svg"/>
                      <Item addOrRemoveItem={this.addOrRemoveItem}  item="/items/sunglasses01.svg"/>
                      <Item addOrRemoveItem={this.addOrRemoveItem}  item="/items/sunglasses02.svg"/>
                    </Row>
                  </Items>
                </Row>
              </Col>
            </Row>
          </StoreContainer>
        </Store>  
     );
    }
}
export default ItemStore;