import { useRef, useState } from 'react';

import {
  Box,
  Button,
  Text,
  Flex,
  VStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import CloseIcon from '@mui/icons-material/Close';

import EventPopover from '../EventPopover';
import { useEffect } from 'react';
import { getEventsByUserId } from '../../api/events';
import { memo } from 'react';

const Day = ({
  day,
  isToday,
  hasEvents = {},
  date,
  handleDateForCreateEvent,
  onClick,
}) => {
  const refEvent = useRef(null);
  const [show, setShow] = useState(false);
  const colorNotDay = useColorModeValue('gray.100', 'gray.600');
  const bgColorDay = useColorModeValue('white', 'gray.700');
  const borderColorDay = useColorModeValue('gray.100', 'gray.500');
  const bgColorIsToday = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem('usr_id');
  // console.log(date);

  async function getEvents() {
    try {
      const response = await getEventsByUserId(userId, date);
      if (response.status === 200) setEvents(response.data);
      else console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEvents(action) {
    switch (action.type) {
      case 'DELETE':
        const newEvents = events.filter(
          event => event.eve_id !== action.payload
        );
        setEvents(newEvents);
        break;
      case 'UPDATE':
        const updatedEvents = events.map(event =>
          event.eve_id === action.payload.eve_id ? action.payload : event
        );
        setEvents(updatedEvents);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (hasEvents.counter && date) {
      getEvents();
    }
  }, [hasEvents]);

  if (!day)
    return (
      <Box
        position="relative"
        h="148px"
        width="calc(100% - 1px)"
        border="1px"
        p="1"
        borderColor={colorNotDay}
        bgColor={colorNotDay}
        borderLeftWidth={0}
        borderTopWidth={0}
      ></Box>
    );

  function handleShow() {
    setShow(!show);
  }

  function handleClick(e) {
    if (
      e.currentTarget === e.target ||
      e.target.tagName === 'P' ||
      e.target.tagName === 'HEADER' ||
      e.target.tagName === 'MAIN'
    ) {
      handleDateForCreateEvent(date);
      onClick();
    }
  }

  return (
    <Box position="relative" h="148px" width="calc(100% - 1px)">
      <Flex
        minH="148px"
        h={show ? 'auto' : '148px'}
        width="full"
        border="1px"
        borderColor={borderColorDay}
        p={show ? '4px 4px 12px 4px' : '1'}
        bgColor={isToday ? bgColorIsToday : bgColorDay}
        flexDirection="column"
        justifyContent="space-between"
        boxShadow={show ? 'lg' : 'none'}
        zIndex={show ? 10 : ''}
        top={0}
        left={0}
        position={show ? 'absolute' : 'relative'}
        tabIndex={0}
        borderLeftWidth={0}
        borderTopWidth={0}
        onClick={handleClick}
      >
        <Box>
          <Flex
            as="header"
            alignItems="center"
            justifyContent={show ? 'space-between' : 'center'}
          >
            <Text color={isToday ? 'blue.500' : 'inherit'}>{day}</Text>
            {show && (
              <IconButton
                variant="ghost"
                icon={<CloseIcon />}
                onClick={handleShow}
              />
            )}
          </Flex>
          <VStack as="main" mt="2">
            <VStack height={show ? 'auto' : '56px'} overflow="hidden">
              {events &&
                events.map((event, index) => (
                  <EventPopover
                    key={index}
                    event={event}
                    handleEvents={handleEvents}
                    date={date}
                    ref={refEvent}
                  />
                ))}
            </VStack>
            {events.length > 2 && !show && (
              <Button
                ref={refEvent}
                onClick={handleShow}
                variant="ghost"
                size="sm"
              >
                Mais {events.length - 2}
              </Button>
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

function areEqual(prevProps, nextProps) {
  return prevProps.hasEvents === nextProps.hasEvents;
}

export default memo(Day, areEqual);
