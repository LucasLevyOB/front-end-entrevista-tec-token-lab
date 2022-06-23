import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt';

import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import Day from '../Day';

import generateBlankDays from './generateBlankDays';
import { useEffect } from 'react';
import CreateEvent from '../CreateEvent';
import { getDaysHaveEvents, getEventsByUserId } from '../../api/events';

moment.locale('pt');

const Calendar = () => {
  const [currentDateContext, setCurrentDateContext] = useState(moment());
  const [currentMonth, setCurrentMonth] = useState(
    moment(currentDateContext).month()
  );
  const [currentYear, setCurrentYear] = useState(
    moment(currentDateContext).year()
  );
  const [today, setToday] = useState({ date: null, month: null, year: null });
  const months = moment.months();
  const weekdaysShort = moment.weekdaysShort();
  const daysInMonth = moment(currentDateContext).daysInMonth();
  const [dateForCreateEvent, setDateForCreateEvent] = useState('');
  const bgColorWeekDay = useColorModeValue('blue.200', 'blue.500');
  const borderColorWeekDay = useColorModeValue('gray.200', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = localStorage.getItem('usr_id');
  const [eventsUser, setEventsUser] = useState([]);
  const [daysHaveEvents, setDaysHaveEvents] = useState({});

  async function handleEventsUser(userId) {
    if (!userId) return;
    try {
      const response = await getEventsByUserId(userId);
      setEventsUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDaysHaveEvents(userId) {
    if (!userId) return;
    try {
      const response = await getDaysHaveEvents(userId);
      setDaysHaveEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function incrementCurrentDate() {
    setCurrentMonth(currentMonth + 1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  }
  function decrementCurrentDate() {
    setCurrentMonth(currentMonth - 1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  }

  function isToday(date, month, year) {
    return date === today.date && month === today.month && year === today.year;
  }

  function firstDayOfMonth() {
    return moment(currentDateContext).startOf('month').day();
  }

  function handleDateForCreateEvent(date) {
    setDateForCreateEvent(date);
  }

  useEffect(() => {
    setCurrentDateContext(
      moment().year(currentYear).month(months[currentMonth])
    );
  }, [currentMonth, currentYear]);

  useEffect(() => {
    setToday({
      date: moment(currentDateContext).date(),
      month: moment(currentDateContext).month(),
      year: moment(currentDateContext).year(),
    });
  }, []);

  useEffect(() => {
    // handleEventsUser(userId);
    handleDaysHaveEvents(userId);
  }, [userId]);

  return (
    <Box overflowY="auto" w="full">
      <Box w="full" minW="496px">
        <Flex justifyContent="center" alignItems="center" mt="5" mb="3">
          <IconButton
            colorScheme="blue"
            aria-label="Mês Anterior"
            title="Mês Anterior"
            variant="outline"
            icon={<KeyboardArrowLeftIcon />}
            onClick={decrementCurrentDate}
          />
          <Center mr="3" ml="3" w="full" maxW="296px">
            <Heading as="h6" variant="h6" textTransform="capitalize">
              {months[currentMonth]}
              <Box as="span" mr="2" ml="2">
                -
              </Box>
              {currentYear}
            </Heading>
          </Center>
          <IconButton
            colorScheme="blue"
            aria-label="Próximo Mês"
            title="Próximo Mês"
            variant="outline"
            icon={<KeyboardArrowRightIcon />}
            onClick={incrementCurrentDate}
          />
        </Flex>
        <Flex w="full">
          {weekdaysShort.map((weekday, index) => (
            <Center
              key={index}
              width="calc(100% - 1px)"
              h="38px"
              bg={bgColorWeekDay}
              borderWidth="1px"
              borderColor={borderColorWeekDay}
              boxShadow="base"
              borderLeftWidth={0}
              p={1}
            >
              {weekday}
            </Center>
          ))}
        </Flex>
        <SimpleGrid columns={7} spacing="0" w="full">
          {generateBlankDays(firstDayOfMonth())}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const formatedDate = moment(
              `${currentYear}-${currentMonth + 1}-${index + 1}`
            ).format('YYYY-MM-DD');
            return (
              <Day
                key={formatedDate}
                day={index + 1}
                isToday={isToday(index + 1, currentMonth, currentYear)}
                hasEvents={daysHaveEvents[formatedDate]}
                date={formatedDate}
                handleDateForCreateEvent={handleDateForCreateEvent}
                onClick={onOpen}
              />
            );
          })}
          {generateBlankDays(42 - daysInMonth - firstDayOfMonth())}
        </SimpleGrid>
        <CreateEvent
          isOpen={isOpen}
          onClose={onClose}
          date={dateForCreateEvent}
          daysHaveEvents={daysHaveEvents}
          setDaysHaveEvents={setDaysHaveEvents}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
