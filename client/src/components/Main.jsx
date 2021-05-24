import React from 'react'
import styled from 'styled-components';
import Body from './Body';
import Header from './Header';


const Container = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
`

//const ele = [...departmentNodes, ...departmentEdges]

function Main() {
    
      return (
        <Container>
          <Header/>
          <Body/>
    
        </Container>
    );
}

export default Main;
