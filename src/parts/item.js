import React from 'react';
import styled from "styled-components"

const Image = styled.img`
  position: relative;
`
const Container = styled.div`
  position: relative;
  height: 100%;
`
const Deselected = styled.div`
  display: table-cell;
  width: 124px;
  height: 139px;
  white-space: nowrap;
  background: #707070 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 8px;
  opacity: 1;
  margin: 5px 10px 5px 10px;
`
const Selected = styled(Deselected)`
border: 1px solid #FF3BFF;
`
const Indicator = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #FF3BFF;
  float: right;
  margin-top: 7px;
  margin-right: 7px;
`

class Item extends React.Component {
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
      const Window = this.state.highlighted ? Selected : Deselected
      return (
          <Window onClick={this.onClick}>
            {this.state.highlighted ? <Indicator/> : null}
            <Container>
              <Image src={this.state.item}/>
            </Container>
          </Window>
     );
    }
}
export default Item;