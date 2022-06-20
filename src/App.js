import React from 'react';
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';

import Routes from './routes';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Routes />
    </ChakraProvider>
  );
}

export default App;
