import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UnifiedView.css'
import ItemView from './ItemView'

import { Card, Container, Row, Col, Button  } from 'react-bootstrap'
import KittyView from './KittyView';

class UnifiedView extends React.Component {
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
      return (
        <Card className="itemStoreWindow">
          <Container className="storeWindowContainer" fluid>
            <Row id="store-row-view">
              <Col h-100 className="kittyWindow">
                <KittyView items={this.state.items}/>
              </Col>
              <Col>
                <Row id="store-header">
                  <Col>
                    Items Store
                  </Col>

                  <Col>
                    Cancel
                    <Button variant="outline-secondary">Apply</Button>
                  </Col>
                </Row>
                <Row h-100>
                  <Col id="kitty-items-right-col">
                    <Row>
                      <ItemView addOrRemoveItem={this.addOrRemoveItem} item="/items/hat01.svg"/>
                      <ItemView addOrRemoveItem={this.addOrRemoveItem}  item="/items/hat02.svg"/>
                      <ItemView addOrRemoveItem={this.addOrRemoveItem}  item="/items/hat03.svg"/>
                      <ItemView addOrRemoveItem={this.addOrRemoveItem}  item="/items/hat04.svg"/>
                      <ItemView addOrRemoveItem={this.addOrRemoveItem}  item="/items/sunglasses01.svg"/>
                      <ItemView addOrRemoveItem={this.addOrRemoveItem}  item="/items/sunglasses02.svg"/>
                    </Row>
                  </Col>

                </Row>
              </Col>
            </Row>
          </Container>
        </Card>  
     );
    }
}
export default UnifiedView;