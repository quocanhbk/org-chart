import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Main from './components/Main';
import theme from './utils/theme';
import Context from './Context';

const StyledApp = styled.div`
  background: ${(props) => props.theme.color.background.primary};
  height: 100vh;
  overflow: hidden;
  transition: background 0.25s ease-out;
  color: ${props => props.theme.color.text.primary};
`;
const Container = () => {
  const {themeContext} = Context.useContainer()
  
  return (
    <ThemeProvider theme={themeContext.isDark ? theme.dark : theme.light}>
        <StyledApp>
            <Main/>
        </StyledApp>
    </ThemeProvider>
  );
};
function App() {
  return (
    <Context.Provider>
      <Container />
    </Context.Provider>
  );
}

export default App;
