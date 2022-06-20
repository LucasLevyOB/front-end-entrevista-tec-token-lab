import { useRef } from 'react';

import { Box, Button, Center, Flex, VStack } from '@chakra-ui/react';

import EventPopover from '../EventPopover';

const Day = ({ day, isToday, eventsForDate = [], onClick }) => {
  const refEvent = useRef(null);

  if (!day)
    return (
      <Box
        width="calc(100% - 1px)"
        h="148px"
        border="1px"
        borderColor="gray.100"
      ></Box>
    );

  return (
    <Flex
      width="calc(100% - 1px)"
      h="148px"
      border="1px"
      borderColor="gray.100"
      p="1"
      bgColor={isToday ? 'gray.300' : 'inherit'}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Center as="header">{day}</Center>
        <VStack as="main" mt="2">
          {eventsForDate?.events &&
            eventsForDate.events.map((event, index) => (
              <EventPopover
                key={index}
                event={event}
                date={eventsForDate.date}
                ref={refEvent}
              />
            ))}
        </VStack>
      </Box>
      <Center as="footer">
        <Button
          onClick={onClick}
          variant="outline"
          colorScheme="orange"
          size="sm"
        >
          Criar Evento
        </Button>
      </Center>
    </Flex>
  );
};

export default Day;
