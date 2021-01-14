import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  height: 100%;
`
const Item = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1;
`
const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 0;
`
class Kitty extends React.Component {
  render() {
    let items = this.props.items ? this.props.items : []
    let kitty = this.props.kitty ? this.props.kitty.image : null
    return (
      <Container>
        {items.map(function (item, i) {
          return <Item src={item} key={i} />
        })}
        <Image src={kitty} />
      </Container>
    )
  }
}
export default Kitty
