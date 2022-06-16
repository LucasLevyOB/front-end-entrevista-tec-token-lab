import { Box, Center, VStack } from '@chakra-ui/react';

import EventTag from '../EventTag';

const Day = ({ day }) => {
  if (!day)
    return (
      <Box
        width="calc(100% - 1px)"
        h="104px"
        border="1px"
        borderColor="gray.100"
      ></Box>
    );
  return (
    <Box
      width="calc(100% - 1px)"
      h="104px"
      border="1px"
      borderColor="gray.100"
      p="1"
    >
      <Center as="header">{day}</Center>
      <VStack as="main" mt="2">
        <EventTag title="Evento 1" />
      </VStack>
    </Box>
  );
};

export default Day;
