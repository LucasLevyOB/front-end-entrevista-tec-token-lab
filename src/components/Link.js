import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterDomLink } from 'react-router-dom';

const Link = ({ children, ...props }) => {
  return (
    <ChakraLink as={RouterDomLink} {...props}>
      {children}
    </ChakraLink>
  );
};

export default Link;
