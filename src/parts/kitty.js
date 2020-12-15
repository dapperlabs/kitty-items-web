import React from 'react';
import styled from "styled-components"
import { useKitty } from "../hooks/use-kitty.hook"

const Container = styled.div`
  position: relative;
  height: 100%;
`
const Item = styled.img`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  z-index: 1;
`
const Image = styled.img`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  z-index: 0;
`
export function Kitty({address, ACCOUNT, kittyId}) {
  const [kitty, setKitty] = useKitty(address, ACCOUNT, kittyId)
  return (
      <Container>
        {kitty.items.map(function(item, i){
          return <Item src={item.image} key={i}/>
        })}
        <Image src={kitty.image}/>
      </Container>     
  );
}
export default Kitty;