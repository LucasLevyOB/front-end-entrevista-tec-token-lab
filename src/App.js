import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Routes from './routes';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
{
  /* <ColorModeSwitcher justifySelf="flex-end" /> */
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
}

export default App;
