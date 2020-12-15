
import styled from "styled-components"
import { useKittyItem } from "../hooks/use-kitty-item.hook"
import { useKitty } from "../hooks/use-kitty.hook"
import React, { useState } from 'react';

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
export function Item({address, ACCOUNT, itemId, kittyId}) {
  const [kitty, setKitty] = useKitty(address, ACCOUNT, kittyId)
  const [item] = useKittyItem(address, ACCOUNT, itemId)
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected)
    kitty.items.push(itemId)
    // setKitty(kitty)
  }

  const Window = selected ? Selected : Deselected
  return (
      <Window onClick={onClick}>
        {selected ? <Indicator/> : null}
        <Container>
          <Image src={item.image}/>
        </Container>
      </Window>
  )
}