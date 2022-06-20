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
  useDisclosure,
} from '@chakra-ui/react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import Day from '../Day';

import generateBlankDays from './generateBlankDays';
import { useEffect } from 'react';
import CreateEvent from '../CreateEvent';

moment.locale('pt');

const events = [
  {
    date: '2022-06-06',
    events: [
      {
        title: 'Evento 1',
        description: 'Descrição do evento 1',
        dateBegin: '2022-06-06T10:00:00',
        dateEnd: '2022-06-06T12:00:00',
      },
      {
        title: 'Evento 2',
        description: 'Descrição do evento 2',
        dateBegin: '2022-06-06T13:00:00',
        dateEnd: '2022-06-06T15:00:00',
      },
    ],
  },
  {
    date: '2022-06-10',
    events: [
      {
        title: 'Evento 3',
        description: 'Descrição do evento 3',
        dateBegin: '2022-06-10T12:00:00',
        dateEnd: '2022-06-10T16:00:00',
      },
    ],
  },
  {
    date: '2022-06-13',
    events: [
      {
        title: 'Evento 4',
        description: 'Descrição do evento 4',
        dateBegin: '2022-06-13T09:00:00',
        dateEnd: '2022-06-13T11:00:00',
      },
      {
        title: 'Evento 5 um evento bem evento de evento',
        description: 'Descrição do evento 5',
        dateBegin: '2022-06-13T14:30:00',
        dateEnd: '2022-06-13T15:00:00',
      },
      {
        title: 'Evento 6',
        description: 'Descrição do evento 6',
        dateBegin: '2022-06-13T15:30:00',
        dateEnd: '2022-06-13T17:00:00',
      },
    ],
  },
];

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

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <>
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
      <Flex spacing="0">
        {weekdaysShort.map((weekday, index) => (
          <Center
            key={index}
            width="calc(100% - 1px)"
            h="38px"
            bg="blue.200"
            border="1px"
            borderColor="gray.200"
            boxShadow="base"
          >
            {weekday}
          </Center>
        ))}
      </Flex>
      <SimpleGrid columns={7} spacing="0">
        {generateBlankDays(firstDayOfMonth())}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const formatedDate = moment(
            `${currentYear}-${currentMonth + 1}-${index + 1}`
          ).format('YYYY-MM-DD');
          const eventsForDate = events.filter(
            event => event.date === formatedDate
          );
          return (
            <Day
              key={index}
              day={index + 1}
              isToday={isToday(index + 1, currentMonth, currentYear)}
              eventsForDate={eventsForDate[0]}
              onClick={onOpen}
            />
          );
        })}

        {/* {Array.from({ length: daysInMonth }, (_, index) => (
          <Day
            key={index}
            day={index + 1}
            today={isToday(index + 1, currentMonth, currentYear)}
          />
        ))} */}
        {generateBlankDays(42 - daysInMonth - firstDayOfMonth())}
      </SimpleGrid>
      <CreateEvent isOpen={isOpen} onClose={onClose} date="2022-06-01" />
    </>
  );
};

export default Calendar;
